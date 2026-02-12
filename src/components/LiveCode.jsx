import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiCommandLine } from 'react-icons/hi2';

const codeSnippet = `
// Optimized Event Processor
async function processEvents(batch) {
  const result = await Promise.all(
    batch.map(async (event) => {
      if (!isValid(event)) return null;
      
      const enriched = await enrichData(event);
      return sanitize(enriched);
    })
  );

  return result.filter(Boolean);
}
`.trim();

const syntaxColors = {
    keyword: 'text-purple-400',
    function: 'text-blue-400',
    string: 'text-green-400',
    comment: 'text-gray-500 italic',
    operator: 'text-pink-400',
    default: 'text-gray-200'
};

const highlightCode = (code) => {
    // Simple regex-based highlighting (very basic)
    const tokens = code.split(/(\s+|[(){}[\];,.])/g);

    return tokens.map((token, i) => {
        if (!token) return null;
        let color = syntaxColors.default;

        if (/^(async|await|function|const|return|if|for|while|try|catch)$/.test(token)) color = syntaxColors.keyword;
        else if (/^(processEvents|enrichData|sanitize|isValid|filter|map|Promise|all)$/.test(token)) color = syntaxColors.function;
        else if (/^\/\/.*$/.test(token)) color = syntaxColors.comment; // Comments handled poorly by split, need line logic
        else if (/^['"`].*['"`]$/.test(token)) color = syntaxColors.string;
        else if (/^[=<>!&|]+$/.test(token)) color = syntaxColors.operator;

        return <span key={i} className={color}>{token}</span>;
    });
};

// Better approach for comment support: Line by line
const LiveCode = () => {
    const [displayedCode, setDisplayedCode] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollRef = useRef(null);
    const isInView = useInView(scrollRef, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        if (currentIndex < codeSnippet.length) {
            const timeout = setTimeout(() => {
                setDisplayedCode(prev => prev + codeSnippet[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, Math.random() * 30 + 30); // Random typing speed

            return () => clearTimeout(timeout);
        } else {
            // Reset after delay
            const resetTimeout = setTimeout(() => {
                setDisplayedCode('');
                setCurrentIndex(0);
            }, 5000);
            return () => clearTimeout(resetTimeout);
        }
    }, [currentIndex, isInView]);

    return (
        <div ref={scrollRef} className="w-full max-w-2xl mx-auto my-12 bg-[#1e1e1e] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            {/* Mac-style Header */}
            <div className="bg-[#252526] px-4 py-2 flex items-center gap-2 border-b border-black/20">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="ml-4 text-xs text-gray-400 font-mono flex items-center gap-1">
                    <HiCommandLine className="w-3 h-3" /> processor.ts
                </div>
            </div>

            {/* Code Area */}
            <div className="p-6 font-mono text-sm md:text-base leading-relaxed h-[300px] overflow-hidden relative">
                <pre className="whitespace-pre-wrap">
                    {/* 
               We need to highlight based on the full *displayed* string. 
               Since regex highlighting on partial strings is hard, we'll just render plain text 
               or simple highlighting. For "Engineering" aesthetic, let's try to highlight key words simple.
            */}
                    {displayedCode.split('\n').map((line, lineIdx) => (
                        <div key={lineIdx} className={line.trim().startsWith('//') ? 'text-gray-500 italic' : ''}>
                            {line.split(/(\s+|[(){}[\];,.])/g).map((token, tokIdx) => {
                                if (!token) return null;
                                let color = syntaxColors.default;
                                // Check keywords if not a comment line
                                if (!line.trim().startsWith('//')) {
                                    if (/^(async|await|function|const|return|if|for|while|try|catch)$/.test(token)) color = syntaxColors.keyword;
                                    else if (/^(processEvents|enrichData|sanitize|isValid|filter|map|Promise|all)$/.test(token)) color = syntaxColors.function;
                                    // Strings are hard in this split logic, skip for simplicity or assume simple tokens
                                }
                                return <span key={tokIdx} className={color}>{token}</span>;
                            })}
                        </div>
                    ))}
                    <span className="animate-pulse bg-white/50 w-2 h-4 inline-block align-middle ml-1"></span>
                </pre>
            </div>

            {/* Footer Status Bar */}
            <div className="bg-purple-900/20 text-purple-200/50 text-[10px] px-3 py-1 font-mono flex justify-between">
                <span>TypeScript</span>
                <span>Ln {displayedCode.split('\n').length}, Col {currentIndex}</span>
            </div>
        </div>
    );
};

export default LiveCode;
