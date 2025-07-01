import {
  forwardRef,
  HTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from 'react';

const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="w-full overflow-auto">
      <table
        ref={ref}
        className={`w-full caption-bottom text-sm ${className}`}
        {...props}
      />
    </div>
  )
);
Table.displayName = 'Table';

const TableHeader = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={`bg-gray-50/80 backdrop-blur-sm sticky top-0 z-10 [&_tr]:border-b border-gray-200/50 ${className}`}
    {...props}
  />
));
TableHeader.displayName = 'TableHeader';

const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={`[&_tr:last-child]:border-0 divide-y divide-gray-100/50 ${className}`}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

const TableRow = forwardRef<
  HTMLTableRowElement,
  HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={`
      border-b border-gray-100/50 transition-all duration-300 group
      hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-blue-50/50 
      hover:backdrop-blur-sm hover:shadow-sm
      data-[state=selected]:bg-purple-50/80 data-[state=selected]:backdrop-blur-sm
      data-[state=selected]:shadow-md data-[state=selected]:border-purple-200/50
      cursor-pointer relative overflow-hidden
      ${className}
    `}
    {...props}
  >
    {/* Subtle shimmer effect on hover */}
    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
    {props.children}
  </tr>
));
TableRow.displayName = 'TableRow';

const TableHead = forwardRef<
  HTMLTableCellElement,
  ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={`
      h-12 px-6 text-left align-middle font-semibold text-gray-700 
      [&:has([role=checkbox])]:pr-0 uppercase text-xs tracking-wider
      transition-colors duration-300 hover:text-purple-700
      ${className}
    `}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

const TableCell = forwardRef<
  HTMLTableCellElement,
  TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={`
      px-6 py-4 align-middle [&:has([role=checkbox])]:pr-0 
      text-gray-900 relative z-10
      transition-all duration-300 group-hover:text-gray-950
      ${className}
    `}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

// Composant TableContainer moderne avec glassmorphism
const TableContainer = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={`
      bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 
      shadow-lg shadow-gray-500/5 overflow-hidden
      hover:shadow-xl hover:shadow-gray-500/10 transition-all duration-300
      ${className}
    `}
    {...props}
  >
    {children}
  </div>
));
TableContainer.displayName = 'TableContainer';

// Composant pour les actions sur les lignes
const TableAction = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={`
      inline-flex items-center justify-center h-8 w-8 rounded-lg
      text-gray-400 hover:text-gray-600 hover:bg-gray-100/80
      transition-all duration-200 backdrop-blur-sm
      hover:scale-110 active:scale-95
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
));
TableAction.displayName = 'TableAction';

// Composant pour les badges/status
const TableBadge = forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & {
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  }
>(({ className, variant = 'default', children, ...props }, ref) => {
  const variants = {
    default: 'bg-gray-100/80 text-gray-700 border-gray-200/50',
    success: 'bg-green-100/80 text-green-700 border-green-200/50',
    warning: 'bg-yellow-100/80 text-yellow-700 border-yellow-200/50',
    error: 'bg-red-100/80 text-red-700 border-red-200/50',
    info: 'bg-blue-100/80 text-blue-700 border-blue-200/50',
  };

  return (
    <span
      ref={ref}
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
        backdrop-blur-sm border transition-all duration-200
        hover:scale-105 hover:shadow-sm
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
});
TableBadge.displayName = 'TableBadge';

export {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableAction,
  TableBadge,
};
