// filepath: /Users/neilhumphrey/Desktop/code-new/src/react-syntax-highlighter.d.ts
declare module 'react-syntax-highlighter' {
    import { ComponentType } from 'react';
  
    export const Light: ComponentType<any>;
    export const Prism: ComponentType<any>;
    export const registerLanguage: (name: string, language: any) => void;
  }
  
  declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
    const styles: { [key: string]: any };
    export default styles;
  }