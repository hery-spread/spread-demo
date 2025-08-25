import { InputHTMLAttributes, forwardRef, useState } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, success, helperText, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(
      !!props.value || !!props.defaultValue
    );

    return (
      <div className="flex flex-col gap-2 group">
        {label && (
          <label
            className={`text-sm font-medium transition-all duration-300 ${
              isFocused || hasValue
                ? error
                  ? 'text-red-600'
                  : success
                    ? 'text-green-600'
                    : 'text-purple-600'
                : 'text-gray-700'
            }`}
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <input
            type={type}
            className={`
              flex h-11 w-full rounded-xl border backdrop-blur-sm bg-white/80 px-4 py-3 text-sm 
              ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium 
              placeholder:text-gray-500 transition-all duration-300 transform-gpu
              hover:bg-white/90 focus:bg-white/95
              disabled:cursor-not-allowed disabled:opacity-50
              ${
                error
                  ? 'border-red-300 focus-visible:ring-red-500 focus-visible:border-red-500 shadow-lg shadow-red-500/10'
                  : success
                    ? 'border-green-300 focus-visible:ring-green-500 focus-visible:border-green-500 shadow-lg shadow-green-500/10'
                    : 'border-gray-300/60 focus-visible:ring-purple-500 focus-visible:border-purple-500 shadow-lg shadow-purple-500/5'
              }
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 
              focus-visible:shadow-xl focus-visible:scale-[1.01]
              ${isFocused ? 'shadow-xl' : 'shadow-sm hover:shadow-md'}
              ${className}
            `}
            ref={ref}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            onChange={(e) => {
              setHasValue(!!e.target.value);
              props.onChange?.(e);
            }}
            {...props}
          />

          {/* Glassmorphism glow effect on focus */}
          <div
            className={`
            absolute inset-0 rounded-xl transition-opacity duration-300 pointer-events-none
            ${isFocused ? 'opacity-100' : 'opacity-0'}
            ${
              error
                ? 'bg-gradient-to-r from-red-500/5 via-red-500/10 to-red-500/5'
                : success
                  ? 'bg-gradient-to-r from-green-500/5 via-green-500/10 to-green-500/5'
                  : 'bg-gradient-to-r from-purple-500/5 via-purple-500/10 to-purple-500/5'
            }
          `}
          />

          {/* Success checkmark */}
          {success && !error && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center animate-in zoom-in duration-300">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Error icon */}
          {error && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center animate-in zoom-in duration-300">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Helper text, error, or success message */}
        {(error || success || helperText) && (
          <div className="flex items-center gap-1">
            {error && (
              <>
                <svg
                  className="w-4 h-4 flex-shrink-0 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm text-red-600 animate-in slide-in-from-left duration-300">
                  {error}
                </p>
              </>
            )}
            {success && !error && (
              <>
                <svg
                  className="w-4 h-4 flex-shrink-0 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="text-sm text-green-600 animate-in slide-in-from-left duration-300">
                  Parfait !
                </p>
              </>
            )}
            {helperText && !error && !success && (
              <p className="text-sm text-gray-500">{helperText}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
