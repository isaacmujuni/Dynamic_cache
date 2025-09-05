# Dynamic Code Studio

A modern web-based code editor with AI-powered code generation using DeepSeek Coder models and integrated documentation support.

## Features

### 🤖 AI-Powered Code Generation
- Integration with DeepSeek Coder models
- Natural language to code conversion
- Support for multiple programming languages
- Context-aware code suggestions

### 📝 Advanced Code Editor
- Monaco Editor (VS Code editor) integration
- Syntax highlighting for multiple languages
- Auto-completion and IntelliSense
- Code formatting and folding
- Multiple themes (Dark, Light, High Contrast)

### 📚 Integrated Documentation
- Side-by-side code and documentation editing
- Markdown support with live preview
- Toggle between edit and preview modes
- Project documentation management

### 💾 Project Management
- Save and load projects as JSON files
- Auto-save to local storage
- File management system
- Session restoration

### 🎨 Modern UI/UX
- Responsive design
- Clean and intuitive interface
- Customizable themes
- Keyboard shortcuts support

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- DeepSeek API key (get one from [DeepSeek Platform](https://platform.deepseek.com/))

### Setup
1. Open `index.html` in your web browser
2. Enter your DeepSeek API key when prompted
3. Start coding!

### Usage

#### Code Generation
1. Describe what you want to build in the prompt box
2. Click "Generate with AI" or press Ctrl+Enter
3. The AI will generate code based on your description
4. The generated code will be inserted into the editor

#### Example Prompts
- "Create a function to sort an array of numbers"
- "Build a REST API endpoint for user authentication"
- "Write a class for managing a shopping cart"
- "Generate a React component for a todo list"

#### Keyboard Shortcuts
- `Ctrl+Enter`: Generate code from prompt
- `Ctrl+S`: Save project
- `Ctrl+O`: Load project
- `F5`: Run code (simulation)
- `Ctrl+Shift+F`: Format code

#### Supported Languages
- Python
- JavaScript
- TypeScript
- Java
- C++
- HTML
- CSS
- And more...

## File Structure

```
Dynamic_cache/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## Configuration

### API Key Setup
1. Get your API key from [DeepSeek Platform](https://platform.deepseek.com/)
2. Click the "Generate Code" button or the settings icon
3. Enter your API key in the modal
4. The key will be saved locally for future sessions

### Customization
- **Theme**: Change editor theme in the sidebar settings
- **Language**: Select your preferred programming language
- **Layout**: Drag the splitter to resize panels

## API Integration

The application uses the DeepSeek API for code generation:

```javascript
// Example API call structure
{
  model: 'deepseek-coder',
  messages: [
    {
      role: 'system',
      content: 'You are a helpful coding assistant...'
    },
    {
      role: 'user',
      content: 'User prompt here'
    }
  ],
  max_tokens: 2048,
  temperature: 0.3
}
```

## Local Storage

The application automatically saves:
- Current project files
- Editor content
- API key (encrypted)
- User preferences

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Security Notes

- API keys are stored locally in your browser
- No code is sent to external servers except for AI generation
- All processing happens client-side

## Troubleshooting

### Common Issues

1. **API Key Issues**
   - Ensure your DeepSeek API key is valid
   - Check your API quota and billing status

2. **Editor Not Loading**
   - Ensure you have a stable internet connection
   - Try refreshing the page
   - Check browser console for errors

3. **Code Generation Fails**
   - Verify your API key is correctly entered
   - Check your internet connection
   - Try simplifying your prompt

### Error Messages
- `Invalid API key`: Check your DeepSeek API key
- `Network error`: Check internet connection
- `Rate limit exceeded`: Wait before making more requests

## Contributing

This is a demo application. For production use, consider:
- Adding backend code execution
- Implementing user authentication
- Adding more AI models
- Enhanced error handling
- Database integration

## License

This project is for demonstration purposes. Please check DeepSeek's terms of service for API usage.

## Support

For issues related to:
- **DeepSeek API**: Visit [DeepSeek Platform](https://platform.deepseek.com/)
- **Monaco Editor**: Check [Monaco Editor Documentation](https://microsoft.github.io/monaco-editor/)
- **Application Issues**: Check browser console for error messages

---

**Happy Coding! 🚀**
