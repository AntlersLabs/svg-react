import { SVGData } from './svg-utils';

export interface ComponentOptions {
  name: string;
  framework: 'react' | 'vue' | 'svelte';
  includeTypeScript?: boolean;
  includeProps?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function generateReactComponent(svgData: SVGData, options: ComponentOptions): string {
  const { name, includeTypeScript = true, includeProps = true } = options;
  
  if (includeTypeScript && includeProps) {
    return `import React from 'react';

interface ${name}Props {
  className?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
  color?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number | string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const ${name}: React.FC<${name}Props> = ({
  className = "",
  size,
  width = size || ${svgData.width},
  height = size || ${svgData.height},
  color,
  fill = color || "currentColor",
  stroke = "currentColor",
  strokeWidth = 1,
  onClick,
  style,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="${svgData.viewBox}"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={\`\${className}\`}
      onClick={onClick}
      style={style}
      {...props}
    >
      ${svgData.innerContent.replace(/fill="[^"]*"/g, `fill={fill}`).replace(/stroke="[^"]*"/g, `stroke={stroke}`).replace(/stroke-width="[^"]*"/g, `strokeWidth={strokeWidth}`)}
    </svg>
  );
};

export default ${name};`;
  }

  return `import React from 'react';

export const ${name} = ({ className = "", size, width = size || ${svgData.width}, height = size || ${svgData.height}, ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="${svgData.viewBox}"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={\`\${className}\`}
      {...props}
    >
      ${svgData.innerContent}
    </svg>
  );
};

export default ${name};`;
}

export function generateVueComponent(svgData: SVGData, options: ComponentOptions): string {
  const { includeTypeScript = true, includeProps = true } = options;
  
  if (includeTypeScript && includeProps) {
    return `<template>
  <svg
    :width="width"
    :height="height"
    viewBox="${svgData.viewBox}"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="className"
    :style="style"
    @click="onClick"
    v-bind="$attrs"
  >
    ${svgData.innerContent.replace(/fill="[^"]*"/g, ':fill="fill"').replace(/stroke="[^"]*"/g, ':stroke="stroke"').replace(/stroke-width="[^"]*"/g, ':stroke-width="strokeWidth"')}
  </svg>
</template>

<script setup lang="ts">
interface Props {
  className?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
  color?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number | string;
  onClick?: () => void;
  style?: Record<string, any>;
}

withDefaults(defineProps<Props>(), {
  className: "",
  width: ${svgData.width},
  height: ${svgData.height},
  fill: "currentColor",
  stroke: "currentColor",
  strokeWidth: 1,
});
</script>`;
  }

  return `<template>
  <svg
    :width="width"
    :height="height"
    viewBox="${svgData.viewBox}"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="className"
    v-bind="$attrs"
  >
    ${svgData.innerContent}
  </svg>
</template>

<script setup>
withDefaults(defineProps(), {
  className: "",
  width: ${svgData.width},
  height: ${svgData.height},
});
</script>`;
}

export function generateSvelteComponent(svgData: SVGData, options: ComponentOptions): string {
  const { includeTypeScript = true, includeProps = true } = options;
  
  if (includeTypeScript && includeProps) {
    return `<script lang="ts">
  export let className: string = "";
  export let size: number | string | undefined = undefined;
  export let width: number | string = size || ${svgData.width};
  export let height: number | string = size || ${svgData.height};
  export let color: string | undefined = undefined;
  export let fill: string = color || "currentColor";
  export let stroke: string = "currentColor";
  export let strokeWidth: number | string = 1;
  export let onClick: (() => void) | undefined = undefined;
  export let style: Record<string, any> | undefined = undefined;
</script>

<svg
  {width}
  {height}
  viewBox="${svgData.viewBox}"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class={className}
  style={style}
  on:click={onClick}
  {...$$restProps}
>
  ${svgData.innerContent.replace(/fill="[^"]*"/g, 'fill={fill}').replace(/stroke="[^"]*"/g, 'stroke={stroke}').replace(/stroke-width="[^"]*"/g, 'stroke-width={strokeWidth}')}
</svg>`;
  }

  return `<script>
  export let className = "";
  export let size;
  export let width = size || ${svgData.width};
  export let height = size || ${svgData.height};
</script>

<svg
  {width}
  {height}
  viewBox="${svgData.viewBox}"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class={className}
  {...$$restProps}
>
  ${svgData.innerContent}
</svg>`;
}

export function generateComponent(svgData: SVGData, options: ComponentOptions): string {
  switch (options.framework) {
    case 'react':
      return generateReactComponent(svgData, options);
    case 'vue':
      return generateVueComponent(svgData, options);
    case 'svelte':
      return generateSvelteComponent(svgData, options);
    default:
      throw new Error(`Unsupported framework: ${options.framework}`);
  }
}
