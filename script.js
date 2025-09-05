// Global variables for DeepSeek Coder v2 Documentation
let monacoEditor = null;
let currentLanguage = 'markdown';
let apiKey = localStorage.getItem('deepseek_api_key') || '';
let currentFiles = {
    'README.md': {
        content: '# DeepSeek Coder v2 Documentation\n\nA powerful AI-powered documentation platform powered by DeepSeek Coder v2 that helps you create, edit, and manage documentation with ease.\n\n## Features\n\n- 🤖 **AI-Powered Documentation Generation** - Describe what you want to document, and DeepSeek Coder v2 will generate it for you\n- 📝 **Live Markdown Editor** - Write documentation with real-time preview\n- 🔍 **Smart Search** - Find content across all your documentation\n- 📚 **Multi-page Support** - Organize documentation into multiple pages\n- 🎨 **Professional Themes** - Choose from various documentation themes\n- 💾 **Export Options** - Export to PDF, HTML, or other formats\n\n## Getting Started\n\n1. **Choose a documentation page** from the sidebar\n2. **Describe what you want to document** in the prompt box\n3. **Let DeepSeek Coder v2 generate** the initial content\n4. **Edit and customize** using the live editor\n5. **Preview** your documentation in real-time\n\n## Example Prompts\n\nTry these prompts to get started:\n\n- "Create API documentation for user authentication"\n- "Write a getting started guide for new users"\n- "Generate FAQ section for common questions"\n- "Create installation instructions"\n- "Write troubleshooting guide"\n\n## Tips\n\n- Use **Ctrl+Enter** in the prompt to generate documentation\n- Use **Ctrl+S** to save your project\n- Use **F5** to preview the documentation\n- Switch between **Edit** and **Preview** modes as needed\n\nPowered by DeepSeek Coder v2! 📚✨',
        language: 'markdown'
    },
    'getting-started.md': {
        content: '# Getting Started\n\nThis guide will help you get up and running with DeepSeek Coder v2 Documentation quickly.\n\n## Prerequisites\n\nBefore you begin, make sure you have:\n\n- A modern web browser\n- Internet connection\n- DeepSeek API key (for AI-powered documentation generation)\n\n## Installation\n\n1. Download the application\n2. Extract the files\n3. Run the server\n4. Open in your browser\n\n## First Steps\n\n1. **Configure your DeepSeek API key** (required for AI features)\n2. **Choose your first documentation page**\n3. **Start writing** or use DeepSeek Coder v2 to generate content\n4. **Customize** the appearance and structure\n\n## Next Steps\n\n- Explore the different documentation templates\n- Learn about advanced features\n- Customize your documentation theme\n- Export your documentation\n\n## Need Help?\n\nIf you run into any issues:\n\n- Check the FAQ section\n- Review the troubleshooting guide\n- Contact support\n\n---\n\n*This documentation was generated with DeepSeek Coder v2 Documentation*',
        language: 'markdown'
    }
};
let currentFile = 'README.md';
let isDocsPreviewMode = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeMonacoEditor();
    initializeEventListeners();
    initializeDocumentation();
    checkApiKey();
    updateFileTree();
});

// Initialize Monaco Editor
function initializeMonacoEditor() {
    require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' }});
    
    require(['vs/editor/editor.main'], function() {
        monacoEditor = monaco.editor.create(document.getElementById('codeEditor'), {
            value: currentFiles[currentFile].content,
            language: currentFiles[currentFile].language,
            theme: 'vs-dark',
            automaticLayout: true,
            fontSize: 14,
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            lineNumbers: 'on',
            folding: true,
            bracketMatching: 'always',
            autoIndent: 'full',
            formatOnPaste: true,
            formatOnType: true
        });

        // Auto-save content when editor changes
        monacoEditor.onDidChangeModelContent(() => {
            currentFiles[currentFile].content = monacoEditor.getValue();
            saveToLocalStorage();
        });

        // Load saved content from localStorage
        loadFromLocalStorage();
    });
}

// Initialize event listeners
function initializeEventListeners() {
    // Header controls
    document.getElementById('generateBtn').addEventListener('click', showApiKeyModal);
    document.getElementById('saveBtn').addEventListener('click', saveProject);
    document.getElementById('loadBtn').addEventListener('click', loadProject);

    // Code generation
    document.getElementById('generateCodeBtn').addEventListener('click', generateCode);
    document.getElementById('promptInput').addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            generateCode();
        }
    });

    // Editor controls
    document.getElementById('runCodeBtn').addEventListener('click', runCode);
    document.getElementById('formatCodeBtn').addEventListener('click', formatCode);

    // Documentation controls
    document.getElementById('toggleDocsMode').addEventListener('click', toggleDocsMode);

    // Output controls
    document.getElementById('clearOutputBtn').addEventListener('click', clearOutput);

    // Settings
    document.getElementById('languageSelect').addEventListener('change', changeLanguage);
    document.getElementById('themeSelect').addEventListener('change', changeTheme);

    // File tree
    document.getElementById('fileTree').addEventListener('click', handleFileClick);

    // API Key modal
    document.getElementById('saveApiKeyBtn').addEventListener('click', saveApiKey);
    document.getElementById('cancelApiKeyBtn').addEventListener('click', hideApiKeyModal);
    document.getElementById('apiKeyModal').addEventListener('click', function(e) {
        if (e.target === this) hideApiKeyModal();
    });

    // Search functionality
    document.getElementById('searchInput').addEventListener('input', handleSearch);

    // Splitter functionality
    initializeSplitter();
}

// Initialize documentation panel
function initializeDocumentation() {
    const docsEditor = document.getElementById('docsEditor');
    docsEditor.value = currentFiles['README.md'].content;
    
    docsEditor.addEventListener('input', function() {
        currentFiles['README.md'].content = docsEditor.value;
        if (isDocsPreviewMode) {
            updateDocsPreview();
        }
        saveToLocalStorage();
    });

    updateDocsPreview();
}

// API Key management
function checkApiKey() {
    if (!apiKey) {
        showApiKeyModal();
    }
}

function showApiKeyModal() {
    document.getElementById('apiKeyModal').classList.remove('hidden');
    document.getElementById('apiKeyInput').focus();
}

function hideApiKeyModal() {
    document.getElementById('apiKeyModal').classList.add('hidden');
}

function saveApiKey() {
    const input = document.getElementById('apiKeyInput');
    const newApiKey = input.value.trim();
    
    if (newApiKey) {
        apiKey = newApiKey;
        localStorage.setItem('deepseek_api_key', apiKey);
        hideApiKeyModal();
        addOutputLine('API key saved successfully!', 'success');
    } else {
        alert('Please enter a valid API key');
    }
}

// Documentation generation with DeepSeek API
async function generateCode() {
    const prompt = document.getElementById('promptInput').value.trim();
    
    if (!prompt) {
        alert('Please enter a description of what documentation you want to generate');
        return;
    }

    if (!apiKey) {
        showApiKeyModal();
        return;
    }

    showLoading(true);
    addOutputLine(`Generating documentation: ${prompt}`, 'info');

    try {
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'deepseek-coder',
                messages: [
                    {
                        role: 'system',
                        content: `You are a helpful documentation assistant. Generate clean, well-structured Markdown documentation based on the user's request. Focus on creating professional, comprehensive documentation that is easy to read and understand. Include proper headings, code examples, lists, and formatting. Only return the Markdown content, no explanations unless specifically asked.`
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 2048,
                temperature: 0.3
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const generatedDocs = data.choices[0].message.content;

        // Clean up the generated documentation (remove markdown code blocks if present)
        const cleanDocs = generatedDocs.replace(/```[\w]*\n?/g, '').trim();

        // Insert generated documentation into editor
        if (monacoEditor) {
            const position = monacoEditor.getPosition();
            monacoEditor.executeEdits('', [{
                range: new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column),
                text: cleanDocs + '\n'
            }]);
        }

        addOutputLine('Documentation generated successfully!', 'success');
        document.getElementById('promptInput').value = '';

    } catch (error) {
        console.error('Error generating documentation:', error);
        addOutputLine(`Error: ${error.message}`, 'error');
        
        if (error.message.includes('401')) {
            addOutputLine('Invalid API key. Please check your DeepSeek API key.', 'error');
            showApiKeyModal();
        }
    } finally {
        showLoading(false);
    }
}

// File management
function handleFileClick(e) {
    const fileItem = e.target.closest('.file-item');
    if (!fileItem) return;

    const fileName = fileItem.dataset.file;
    if (fileName && fileName !== currentFile) {
        switchToFile(fileName);
    }
}

function switchToFile(fileName) {
    // Save current file content
    if (monacoEditor && currentFile) {
        currentFiles[currentFile].content = monacoEditor.getValue();
    }

    currentFile = fileName;
    const file = currentFiles[fileName];

    // Update editor
    if (monacoEditor && fileName !== 'README.md') {
        monacoEditor.setValue(file.content);
        monaco.editor.setModelLanguage(monacoEditor.getModel(), file.language);
    }

    // Update documentation panel
    if (fileName === 'README.md') {
        document.getElementById('docsEditor').value = file.content;
        updateDocsPreview();
    }

    // Update UI
    updateFileTree();
    updateLanguageSelect();
}

function updateFileTree() {
    const fileItems = document.querySelectorAll('.file-item');
    fileItems.forEach(item => {
        item.classList.toggle('active', item.dataset.file === currentFile);
    });
}

function updateLanguageSelect() {
    const select = document.getElementById('languageSelect');
    if (currentFiles[currentFile]) {
        select.value = currentFiles[currentFile].language;
        currentLanguage = currentFiles[currentFile].language;
    }
}

// Editor controls
function runCode() {
    const code = monacoEditor.getValue();
    addOutputLine('Running code...', 'info');
    
    // Simulate code execution (in a real implementation, you'd send this to a backend)
    setTimeout(() => {
        addOutputLine('Code execution completed.', 'success');
        addOutputLine('Note: This is a demo. In a real implementation, code would be executed on a backend server.', 'info');
    }, 1000);
}

function formatCode() {
    if (monacoEditor) {
        monacoEditor.getAction('editor.action.formatDocument').run();
        addOutputLine('Code formatted successfully!', 'success');
    }
}

function changeLanguage() {
    const select = document.getElementById('languageSelect');
    const newLanguage = select.value;
    
    if (monacoEditor && currentFile !== 'README.md') {
        monaco.editor.setModelLanguage(monacoEditor.getModel(), newLanguage);
        currentFiles[currentFile].language = newLanguage;
        currentLanguage = newLanguage;
        saveToLocalStorage();
    }
}

function changeTheme() {
    const select = document.getElementById('themeSelect');
    const theme = select.value;
    
    if (monacoEditor) {
        monaco.editor.setTheme(theme);
    }
}

// Documentation controls
function toggleDocsMode() {
    isDocsPreviewMode = !isDocsPreviewMode;
    const editor = document.getElementById('docsEditor');
    const preview = document.getElementById('docsPreview');
    const toggleBtn = document.getElementById('toggleDocsMode');
    
    if (isDocsPreviewMode) {
        editor.classList.add('hidden');
        preview.classList.remove('hidden');
        toggleBtn.innerHTML = '<i class="fas fa-edit"></i>';
        toggleBtn.title = 'Edit Mode';
        updateDocsPreview();
    } else {
        editor.classList.remove('hidden');
        preview.classList.add('hidden');
        toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
        toggleBtn.title = 'Preview Mode';
    }
}

function updateDocsPreview() {
    const docsContent = document.getElementById('docsEditor').value;
    const preview = document.getElementById('docsPreview');
    
    try {
        preview.innerHTML = marked.parse(docsContent);
    } catch (error) {
        preview.innerHTML = '<p>Error rendering markdown preview</p>';
    }
}

// Output management
function addOutputLine(message, type = 'normal') {
    const outputContent = document.getElementById('outputContent');
    const line = document.createElement('div');
    line.className = `output-line ${type}`;
    line.textContent = `${new Date().toLocaleTimeString()}: ${message}`;
    outputContent.appendChild(line);
    outputContent.scrollTop = outputContent.scrollHeight;
}

function clearOutput() {
    const outputContent = document.getElementById('outputContent');
    outputContent.innerHTML = '';
    addOutputLine('Output cleared');
}

// Project management
function saveProject() {
    const projectData = {
        files: currentFiles,
        currentFile: currentFile,
        timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(projectData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'project.json';
    link.click();
    
    addOutputLine('Project saved successfully!', 'success');
}

function loadProject() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const projectData = JSON.parse(e.target.result);
                currentFiles = projectData.files;
                currentFile = projectData.currentFile || 'main.py';
                
                // Update editor
                if (monacoEditor) {
                    switchToFile(currentFile);
                }
                
                // Update documentation
                document.getElementById('docsEditor').value = currentFiles['README.md'].content;
                updateDocsPreview();
                
                saveToLocalStorage();
                addOutputLine('Project loaded successfully!', 'success');
                
            } catch (error) {
                addOutputLine('Error loading project: Invalid file format', 'error');
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
}

// Local storage management
function saveToLocalStorage() {
    const projectData = {
        files: currentFiles,
        currentFile: currentFile
    };
    localStorage.setItem('dynamic_code_studio_project', JSON.stringify(projectData));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('dynamic_code_studio_project');
    if (saved) {
        try {
            const projectData = JSON.parse(saved);
            currentFiles = { ...currentFiles, ...projectData.files };
            currentFile = projectData.currentFile || currentFile;
            
            if (monacoEditor) {
                switchToFile(currentFile);
            }
            
            addOutputLine('Previous session restored', 'info');
        } catch (error) {
            console.error('Error loading from localStorage:', error);
        }
    }
}

// Search functionality
function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    const searchResults = document.getElementById('searchResults');
    
    if (!query) {
        searchResults.classList.remove('show');
        return;
    }
    
    const results = searchInDocumentation(query);
    displaySearchResults(results);
}

function searchInDocumentation(query) {
    const results = [];
    
    Object.keys(currentFiles).forEach(filename => {
        const content = currentFiles[filename].content.toLowerCase();
        const lines = content.split('\n');
        
        lines.forEach((line, index) => {
            if (line.includes(query)) {
                results.push({
                    filename: filename,
                    lineNumber: index + 1,
                    content: line.trim(),
                    title: filename.replace('.md', '').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
                });
            }
        });
    });
    
    return results.slice(0, 10); // Limit to 10 results
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
    } else {
        searchResults.innerHTML = results.map(result => `
            <div class="search-result-item" onclick="goToSearchResult('${result.filename}', ${result.lineNumber})">
                <div class="search-result-title">${result.title}</div>
                <div class="search-result-snippet">${result.content.substring(0, 100)}...</div>
            </div>
        `).join('');
    }
    
    searchResults.classList.add('show');
}

function goToSearchResult(filename, lineNumber) {
    switchToFile(filename);
    if (monacoEditor) {
        monacoEditor.setPosition({ lineNumber: lineNumber, column: 1 });
        monacoEditor.revealLineInCenter(lineNumber);
    }
    document.getElementById('searchResults').classList.remove('show');
    document.getElementById('searchInput').value = '';
}

// Splitter functionality
function initializeSplitter() {
    const splitter = document.querySelector('.splitter');
    const editorPanel = document.querySelector('.editor-panel');
    const docsPanel = document.querySelector('.docs-panel');
    
    let isResizing = false;
    
    splitter.addEventListener('mousedown', function(e) {
        isResizing = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        e.preventDefault();
    });
    
    function handleMouseMove(e) {
        if (!isResizing) return;
        
        const container = document.querySelector('.split-view');
        const containerRect = container.getBoundingClientRect();
        const newEditorWidth = e.clientX - containerRect.left;
        const totalWidth = containerRect.width;
        
        if (newEditorWidth > 300 && (totalWidth - newEditorWidth) > 300) {
            editorPanel.style.flex = `0 0 ${newEditorWidth}px`;
            docsPanel.style.flex = `0 0 ${totalWidth - newEditorWidth - 4}px`;
        }
    }
    
    function handleMouseUp() {
        isResizing = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl+S: Save project
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        saveProject();
    }
    
    // Ctrl+O: Load project
    if (e.ctrlKey && e.key === 'o') {
        e.preventDefault();
        loadProject();
    }
    
    // F5: Run code
    if (e.key === 'F5') {
        e.preventDefault();
        runCode();
    }
    
    // Ctrl+Shift+F: Format code
    if (e.ctrlKey && e.shiftKey && e.key === 'F') {
        e.preventDefault();
        formatCode();
    }
});

// Initialize tooltips and help
function initializeHelp() {
    // Add tooltips to buttons
    const buttons = document.querySelectorAll('[title]');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            // Could implement custom tooltip here
        });
    });
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    addOutputLine(`Application error: ${e.error.message}`, 'error');
});

// Welcome message
setTimeout(() => {
    addOutputLine('Welcome to DeepSeek Coder v2 Documentation!', 'success');
    addOutputLine('Tips: Use Ctrl+Enter in the prompt to generate documentation, F5 to preview, Ctrl+S to save', 'info');
}, 1000);
