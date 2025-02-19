import 'react';

declare module 'react' {
  interface CSSProperties {
    [key: `--tw-${string}`]: string | number;
  }
}
