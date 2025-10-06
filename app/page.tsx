"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Download, Code, Settings, Zap, Clipboard } from "lucide-react";
import { FaReact, FaVuejs } from "react-icons/fa";
import { SiSvelte } from "react-icons/si";
import { parseSVG, optimizeSVG, convertSVGToPNG, downloadFile } from "@/lib/svg-utils";
import { generateComponent, ComponentOptions } from "@/lib/component-generators";
import type { BundledLanguage } from "@/components/ui/kibo-ui/code-block";
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockFiles,
  CodeBlockHeader,
  CodeBlockItem,
} from "@/components/ui/kibo-ui/code-block";

type Framework = "react" | "vue" | "svelte";
type InputMethod = "upload" | "paste";

export default function Home() {
  const [svgContent, setSvgContent] = useState("");
  const [componentName, setComponentName] = useState("Icon");
  const [framework, setFramework] = useState<Framework>("react");
  const [inputMethod, setInputMethod] = useState<InputMethod>("upload");
  const [pastedSvg, setPastedSvg] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [isOptimized, setIsOptimized] = useState(true);
  const [includeTypeScript, setIncludeTypeScript] = useState(true);
  const [includeProps, setIncludeProps] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getLanguageAndFilename = (framework: Framework) => {
    switch (framework) {
      case "react":
        return { language: "tsx" as BundledLanguage, filename: `${componentName}.tsx` };
      case "vue":
        return { language: "html" as BundledLanguage, filename: `${componentName}.vue` };
      case "svelte":
        return { language: "html" as BundledLanguage, filename: `${componentName}.svelte` };
      default:
        return { language: "tsx" as BundledLanguage, filename: `${componentName}.tsx` };
    }
  };

  // Fallback language mapping for better syntax highlighting
  const getFallbackLanguage = (framework: Framework): BundledLanguage => {
    switch (framework) {
      case "react":
        return "tsx";
      case "vue":
        return "html";
      case "svelte":
        return "html";
      default:
        return "tsx";
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "image/svg+xml") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const optimizedContent = isOptimized ? optimizeSVG(content) : content;
        setSvgContent(optimizedContent);
        setPreviewUrl(URL.createObjectURL(file));
        generateComponentCode(optimizedContent, componentName, framework);
      };
      reader.readAsText(file);
    }
  };

  const handlePasteSvg = React.useCallback(() => {
    if (pastedSvg.trim()) {
      try {
        const optimizedContent = isOptimized ? optimizeSVG(pastedSvg) : pastedSvg;
        setSvgContent(optimizedContent);
        // Create a data URL for preview
        const blob = new Blob([optimizedContent], { type: 'image/svg+xml' });
        setPreviewUrl(URL.createObjectURL(blob));
        generateComponentCode(optimizedContent, componentName, framework);
      } catch (error) {
        console.error("Error processing pasted SVG:", error);
      }
    }
  }, [pastedSvg, isOptimized, componentName, framework]);

  // Auto-generate when pasted SVG changes
  React.useEffect(() => {
    if (inputMethod === "paste" && pastedSvg.trim()) {
      const timeoutId = setTimeout(() => {
        handlePasteSvg();
      }, 500); // Debounce for 500ms
      
      return () => clearTimeout(timeoutId);
    }
  }, [pastedSvg, inputMethod, handlePasteSvg]);

  const generateComponentCode = async (svg: string, name: string, framework: Framework) => {
    try {
      setIsGenerating(true);
      const svgData = parseSVG(svg);
      const options: ComponentOptions = {
        name,
        framework,
        includeTypeScript,
        includeProps
      };
      const code = generateComponent(svgData, options);
      setGeneratedCode(code);
    } catch (error) {
      console.error("Error generating component:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerate = () => {
    if (inputMethod === "upload" && svgContent) {
      generateComponentCode(svgContent, componentName, framework);
    } else if (inputMethod === "paste" && pastedSvg) {
      handlePasteSvg();
    }
  };

  const clearAll = () => {
    setSvgContent("");
    setPastedSvg("");
    setGeneratedCode("");
    setPreviewUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };


  const downloadAsPNG = async () => {
    if (!svgContent) return;

    try {
      setIsDownloading(true);
      const pngDataUrl = await convertSVGToPNG(svgContent, 512, 512);
      downloadFile(pngDataUrl, `${componentName.toLowerCase()}.png`);
    } catch (error) {
      console.error("Error downloading PNG:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">
            SVG Component Generator
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            Convert SVG files to React, Vue, or Svelte components with preview and PNG export
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Configuration */}
          <div className="space-y-6 shadow-lg">
            {/* Upload and Configuration */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium text-foreground">
                  Configuration
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Upload an SVG file or paste code to generate components
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Input Method Tabs */}
                <div className="flex space-x-1 bg-muted/50 p-1 rounded-md">
                  <button
                    onClick={() => setInputMethod("upload")}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-sm text-sm font-medium transition-all ${
                      inputMethod === "upload"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                    }`}
                  >
                    <Upload className="h-4 w-4" />
                    Upload
                  </button>
                  <button
                    onClick={() => setInputMethod("paste")}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-sm text-sm font-medium transition-all ${
                      inputMethod === "paste"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                    }`}
                  >
                    <Clipboard className="h-4 w-4" />
                    Paste
                  </button>
                </div>

                {/* Input Section */}
                {inputMethod === "upload" ? (
                  <div>
                    <label className="block text-sm font-medium mb-2">SVG File</label>
                    <div className="flex items-center gap-2">
                      <Input
                        ref={fileInputRef}
                        type="file"
                        accept=".svg"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        Choose SVG File
                      </Button>
                      {(svgContent || pastedSvg) && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={clearAll}
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium mb-2">SVG Code</label>
                    <Textarea
                      value={pastedSvg}
                      onChange={(e) => setPastedSvg(e.target.value)}
                      placeholder="Paste your SVG code here..."
                      className="min-h-[120px] font-mono text-sm"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">Component Name</label>
                  <Input
                    value={componentName}
                    onChange={(e) => setComponentName(e.target.value)}
                    placeholder="Icon"
                  />
        </div>

                {/* Framework Selection */}
                <div>
                  <label className="block text-sm font-medium mb-3 text-foreground">Framework</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setFramework("react")}
                      className={`flex flex-col items-center gap-2 p-3 rounded-md border transition-all ${
                        framework === "react"
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                          : "border-border hover:border-muted-foreground/50 hover:bg-muted/30"
                      }`}
                    >
                      <FaReact className="h-6 w-6 text-blue-500" />
                      <span className="text-xs font-medium text-foreground">React</span>
                    </button>
                    <button
                      onClick={() => setFramework("vue")}
                      className={`flex flex-col items-center gap-2 p-3 rounded-md border transition-all ${
                        framework === "vue"
                          ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                          : "border-border hover:border-muted-foreground/50 hover:bg-muted/30"
                      }`}
                    >
                      <FaVuejs className="h-6 w-6 text-green-500" />
                      <span className="text-xs font-medium text-foreground">Vue</span>
                    </button>
                    <button
                      onClick={() => setFramework("svelte")}
                      className={`flex flex-col items-center gap-2 p-3 rounded-md border transition-all ${
                        framework === "svelte"
                          ? "border-orange-500 bg-orange-50 dark:bg-orange-950/20"
                          : "border-border hover:border-muted-foreground/50 hover:bg-muted/30"
                      }`}
                    >
                      <SiSvelte className="h-6 w-6 text-orange-500" />
                      <span className="text-xs font-medium text-foreground">Svelte</span>
                    </button>
                  </div>
                </div>

                {/* Generation Options */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-foreground">Options</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setIsOptimized(!isOptimized)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-md border transition-all ${
                        isOptimized
                          ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20"
                          : "border-border hover:border-muted-foreground/50 hover:bg-muted/30"
                      }`}
                    >
                      <Zap className="h-4 w-4 text-yellow-500" />
                      <span className="text-xs font-medium text-foreground">Optimize</span>
                    </button>
                    <button
                      onClick={() => setIncludeTypeScript(!includeTypeScript)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-md border transition-all ${
                        includeTypeScript
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                          : "border-border hover:border-muted-foreground/50 hover:bg-muted/30"
                      }`}
                    >
                      <Code className="h-4 w-4 text-blue-500" />
                      <span className="text-xs font-medium text-foreground">TypeScript</span>
                    </button>
                    <button
                      onClick={() => setIncludeProps(!includeProps)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-md border transition-all ${
                        includeProps
                          ? "border-purple-500 bg-purple-50 dark:bg-purple-950/20"
                          : "border-border hover:border-muted-foreground/50 hover:bg-muted/30"
                      }`}
                    >
                      <Settings className="h-4 w-4 text-purple-500" />
                      <span className="text-xs font-medium text-foreground">Props</span>
                    </button>
                  </div>
                </div>

                <Button 
                  onClick={handleGenerate} 
                  className="w-full"
                  disabled={(!svgContent && !pastedSvg) || isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Zap className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Code className="h-4 w-4 mr-2" />
                      Generate Component
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium text-foreground">
                  Preview
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Preview your SVG and download files
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {previewUrl ? (
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 bg-muted/20 flex items-center justify-center min-h-[200px]">
                      <Image
                        src={previewUrl}
                        alt="SVG Preview"
                        width={200}
                        height={200}
                        className="max-w-full max-h-48 object-contain"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        onClick={downloadAsPNG}
                        variant="outline"
                        className="flex items-center gap-2"
                        disabled={isDownloading}
                      >
                        <Download className="h-4 w-4" />
                        {isDownloading ? "Downloading..." : "PNG"}
                      </Button>
                      <Button
                        onClick={() => {
                          const blob = new Blob([svgContent], { type: 'image/svg+xml' });
                          const url = URL.createObjectURL(blob);
                          downloadFile(url, `${componentName.toLowerCase()}.svg`);
                        }}
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        SVG
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="border rounded-lg p-8 bg-muted/20 flex items-center justify-center min-h-[200px] text-muted-foreground">
                    Upload an SVG file or paste code to see preview
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Generated Code */}
          <div>
            {generatedCode ? (
              <Card className="h-fit border-0 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-medium text-foreground">
                    Generated {framework.charAt(0).toUpperCase() + framework.slice(1)} Component
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Copy the generated component code
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <CodeBlock 
                    data={[{
                      language: getFallbackLanguage(framework),
                      filename: getLanguageAndFilename(framework).filename,
                      code: generatedCode
                    }]} 
                    defaultValue={getFallbackLanguage(framework)}
                  >
                    <CodeBlockHeader>
                      <CodeBlockFiles>
                        {(item) => (
                          <CodeBlockFilename key={item.language} value={item.language}>
                            {item.filename}
                          </CodeBlockFilename>
                        )}
                      </CodeBlockFiles>
                      <CodeBlockCopyButton
                        onCopy={() => {
                          setCopySuccess(true);
                          setTimeout(() => setCopySuccess(false), 2000);
                        }}
                        onError={() => console.error("Failed to copy code to clipboard")}
                      />
                    </CodeBlockHeader>
                    <CodeBlockBody>
                      {(item) => (
                        <CodeBlockItem key={item.language} value={item.language}>
                          <CodeBlockContent 
                            language={getFallbackLanguage(framework)}
                            syntaxHighlighting={true}
                          >
                            {item.code}
                          </CodeBlockContent>
                        </CodeBlockItem>
                      )}
                    </CodeBlockBody>
                  </CodeBlock>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-fit border-0 shadow-sm">
                <CardContent className="flex items-center justify-center min-h-[400px] text-muted-foreground">
                  <div className="text-center space-y-3">
                    <Code className="h-8 w-8 mx-auto opacity-40" />
                    <p className="text-sm">Generate a component to see the code here</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
