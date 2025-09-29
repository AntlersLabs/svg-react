export interface SVGData {
  content: string;
  width: string;
  height: string;
  viewBox: string;
  className?: string;
  innerContent: string;
}

export function parseSVG(svgContent: string): SVGData {
  // Clean up the SVG content
  const cleanedSVG = svgContent.trim();
  
  // Extract SVG attributes and content
  const svgMatch = cleanedSVG.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  if (!svgMatch) {
    throw new Error('Invalid SVG content');
  }

  const svgAttributes = cleanedSVG.match(/<svg([^>]*)>/)?.[1] || "";
  const svgInnerContent = svgMatch[1];

  // Parse common attributes with better defaults
  const width = svgAttributes.match(/width="([^"]*)"/)?.[1] || "24";
  const height = svgAttributes.match(/height="([^"]*)"/)?.[1] || "24";
  const viewBox = svgAttributes.match(/viewBox="([^"]*)"/)?.[1] || "0 0 24 24";
  const className = svgAttributes.match(/class="([^"]*)"/)?.[1];

  return {
    content: cleanedSVG,
    width,
    height,
    viewBox,
    className,
    innerContent: svgInnerContent
  };
}

export function optimizeSVG(svgContent: string): string {
  try {
    // Basic SVG optimization without external dependencies
    let optimized = svgContent
      // Remove comments
      .replace(/<!--[\s\S]*?-->/g, '')
      // Remove unnecessary whitespace
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      // Remove empty attributes
      .replace(/\s+=\s*""/g, '')
      .replace(/\s+=\s*''/g, '')
      // Remove default values
      .replace(/\s+fill="none"/g, '')
      .replace(/\s+stroke="none"/g, '')
      .replace(/\s+stroke-width="1"/g, '')
      // Remove unnecessary xmlns attributes if they're default
      .replace(/\s+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/g, '')
      // Clean up extra spaces
      .replace(/\s+/g, ' ')
      .trim();

    return optimized;
  } catch (error) {
    console.warn('SVG optimization failed:', error);
    return svgContent;
  }
}

export function convertSVGToPNG(svgContent: string, width: number = 512, height: number = 512): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    canvas.width = width;
    canvas.height = height;

    img.onload = () => {
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        const pngDataUrl = canvas.toDataURL('image/png');
        resolve(pngDataUrl);
      } else {
        reject(new Error('Could not get canvas context'));
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load SVG image'));
    };

    // Convert SVG to data URL
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    img.src = url;
  });
}

export function downloadFile(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
