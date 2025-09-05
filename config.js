// Configuration file for Dynamic Code Studio
// This file contains default settings and API configuration

const CONFIG = {
    // DeepSeek API Configuration
    API: {
        BASE_URL: 'https://api.deepseek.com/v1',
        MODEL: 'deepseek-coder',
        MAX_TOKENS: 2048,
        TEMPERATURE: 0.3,
        // Timeout in milliseconds
        TIMEOUT: 30000
    },
    
    // Editor Configuration
    EDITOR: {
        DEFAULT_THEME: 'vs-dark',
        DEFAULT_LANGUAGE: 'python',
        FONT_SIZE: 14,
        MINIMAP_ENABLED: true,
        WORD_WRAP: 'on',
        LINE_NUMBERS: 'on',
        AUTO_SAVE_DELAY: 1000 // milliseconds
    },
    
    // UI Configuration
    UI: {
        DEFAULT_SIDEBAR_WIDTH: 250,
        DEFAULT_DOCS_PANEL_WIDTH: 400,
        MIN_PANEL_WIDTH: 300,
        OUTPUT_PANEL_HEIGHT: 200
    },
    
    // Supported Languages
    SUPPORTED_LANGUAGES: [
        { id: 'python', name: 'Python', extension: '.py' },
        { id: 'javascript', name: 'JavaScript', extension: '.js' },
        { id: 'typescript', name: 'TypeScript', extension: '.ts' },
        { id: 'java', name: 'Java', extension: '.java' },
        { id: 'cpp', name: 'C++', extension: '.cpp' },
        { id: 'html', name: 'HTML', extension: '.html' },
        { id: 'css', name: 'CSS', extension: '.css' },
        { id: 'json', name: 'JSON', extension: '.json' },
        { id: 'markdown', name: 'Markdown', extension: '.md' },
        { id: 'sql', name: 'SQL', extension: '.sql' },
        { id: 'php', name: 'PHP', extension: '.php' },
        { id: 'ruby', name: 'Ruby', extension: '.rb' },
        { id: 'go', name: 'Go', extension: '.go' },
        { id: 'rust', name: 'Rust', extension: '.rs' },
        { id: 'swift', name: 'Swift', extension: '.swift' }
    ],
    
    // Default File Templates
    FILE_TEMPLATES: {
        'python': '# Python file\n# Write your Python code here\n\ndef main():\n    print("Hello, World!")\n\nif __name__ == "__main__":\n    main()',
        'javascript': '// JavaScript file\n// Write your JavaScript code here\n\nconsole.log("Hello, World!");',
        'typescript': '// TypeScript file\n// Write your TypeScript code here\n\nfunction main(): void {\n    console.log("Hello, World!");\n}\n\nmain();',
        'java': '// Java file\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
        'cpp': '// C++ file\n#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}',
        'html': '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Document</title>\n</head>\n<body>\n    <h1>Hello, World!</h1>\n</body>\n</html>',
        'css': '/* CSS file */\nbody {\n    font-family: Arial, sans-serif;\n    margin: 0;\n    padding: 20px;\n}\n\nh1 {\n    color: #333;\n}',
        'markdown': '# Document Title\n\nWrite your markdown content here.\n\n## Section\n\n- Item 1\n- Item 2\n- Item 3\n\n```code\n// Code block\nconsole.log("Hello, World!");\n```'
    },
    
    // Code Generation Prompts
    PROMPT_EXAMPLES: [
        'Create a function to sort an array of numbers',
        'Build a REST API endpoint for user authentication',
        'Write a class for managing a shopping cart',
        'Generate a React component for a todo list',
        'Create a database connection function',
        'Write a function to validate email addresses',
        'Build a simple web scraper',
        'Create a binary search algorithm',
        'Write a function to calculate factorial',
        'Generate a password strength checker'
    ],
    
    // Local Storage Keys
    STORAGE_KEYS: {
        API_KEY: 'deepseek_api_key',
        PROJECT: 'dynamic_code_studio_project',
        SETTINGS: 'dynamic_code_studio_settings',
        RECENT_FILES: 'dynamic_code_studio_recent_files'
    },
    
    // Application Metadata
    APP: {
        NAME: 'Dynamic Code Studio',
        VERSION: '1.0.0',
        DESCRIPTION: 'AI-powered code editor with DeepSeek integration',
        GITHUB_URL: 'https://github.com/your-username/dynamic-code-studio',
        DEEPSEEK_URL: 'https://platform.deepseek.com/',
        MONACO_EDITOR_URL: 'https://microsoft.github.io/monaco-editor/'
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
