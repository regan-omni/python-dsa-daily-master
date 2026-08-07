// Browser-side Python interpreter service powered by Pyodide

declare global {
  interface Window {
    loadPyodide?: (config: { indexURL: string }) => Promise<any>;
    pyodideInstance?: any;
  }
}

export interface PyExecutionResult {
  stdout: string;
  error?: string;
  returnedValue?: any;
  executionTimeMs: number;
}

export interface TestResult {
  testCaseIndex: number;
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
  error?: string;
}

let pyodideLoadingPromise: Promise<any> | null = null;

export async function getPyodide(): Promise<any> {
  if (window.pyodideInstance) {
    return window.pyodideInstance;
  }

  if (pyodideLoadingPromise) {
    return pyodideLoadingPromise;
  }

  pyodideLoadingPromise = (async () => {
    // Wait for script to load if needed
    let retries = 0;
    while (!window.loadPyodide && retries < 20) {
      await new Promise((res) => setTimeout(res, 250));
      retries++;
    }

    if (!window.loadPyodide) {
      throw new Error(
        'Pyodide library failed to load from CDN. Please check your internet connection or try refreshing.'
      );
    }

    const pyodide = await window.loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/',
    });

    window.pyodideInstance = pyodide;
    return pyodide;
  })();

  return pyodideLoadingPromise;
}

export async function runPythonCode(
  code: string,
  testCases: Array<{ input: string; expected: string }> = []
): Promise<{
  logs: string;
  testResults: TestResult[];
  overallPassed: boolean;
  executionTimeMs: number;
}> {
  const startTime = performance.now();
  let pyodide: any;

  try {
    pyodide = await getPyodide();
  } catch (err: any) {
    return {
      logs: `Python Engine Error: ${err.message}`,
      testResults: [],
      overallPassed: false,
      executionTimeMs: 0,
    };
  }

  // Setup stdout capture buffer in Python
  const stdoutBuffer: string[] = [];
  pyodide.setStdout({
    batched: (text: string) => {
      stdoutBuffer.push(text);
    },
  });

  let testResults: TestResult[] = [];
  let overallPassed = true;

  try {
    // First, execute the code definition in Python globals
    await pyodide.runPythonAsync(code);

    // Run test cases if provided
    if (testCases && testCases.length > 0) {
      for (let i = 0; i < testCases.length; i++) {
        const tc = testCases[i];
        try {
          // Construct Python evaluation snippet safely
          const evalScript = `
import json

def _run_test_case():
    # Evaluate input argument tuple
    args = (${tc.input})
    # Find defined function name from user code
    user_func = None
    for item in list(globals().values()):
        if callable(item) and getattr(item, '__module__', '') == '__main__' and not item.__name__.startswith('_'):
            user_func = item
            break
            
    if not user_func:
        raise Exception("No user solution function defined")
        
    if isinstance(args, tuple) and len(args) > 0 and not isinstance(args, str):
        res = user_func(*args)
    else:
        res = user_func(args)
        
    return str(res)

_run_test_case()
`;
          const actualRaw = await pyodide.runPythonAsync(evalScript);
          const actual = String(actualRaw).trim();
          const expected = String(tc.expected).trim();

          // Standardize comparison for boolean/array formatting
          const passed = normalizeString(actual) === normalizeString(expected);
          if (!passed) overallPassed = false;

          testResults.push({
            testCaseIndex: i + 1,
            input: tc.input,
            expected,
            actual,
            passed,
          });
        } catch (tcErr: any) {
          overallPassed = false;
          testResults.push({
            testCaseIndex: i + 1,
            input: tc.input,
            expected: tc.expected,
            actual: 'Error',
            passed: false,
            error: tcErr.message,
          });
        }
      }
    }
  } catch (err: any) {
    overallPassed = false;
    stdoutBuffer.push(`Runtime Error:\n${err.message}`);
  }

  const executionTimeMs = Math.round(performance.now() - startTime);

  return {
    logs: stdoutBuffer.join('\n'),
    testResults,
    overallPassed: testCases.length > 0 ? overallPassed : true,
    executionTimeMs,
  };
}

function normalizeString(str: string): string {
  return str
    .replace(/\s+/g, '')
    .replace(/True/g, 'true')
    .replace(/False/g, 'false')
    .replace(/'/g, '"');
}
