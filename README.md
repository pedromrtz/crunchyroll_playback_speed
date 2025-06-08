# Crunchyroll Playback Speed Controller Extension  

*Enhanced version based on the original work by [Danny Fan](https://github.com/dannyfan/crunchyroll-playback-speed)*  

## 🚀 Enhanced Playback Control for Crunchyroll  

This Chrome extension expands on the original project by Danny Fan to give you complete control over playback speed on Crunchyroll. Perfect for binge-watchers, language learners, and anyone who wants to customize their viewing experience.  

### ✨ Key Features  

**🎛️ Precision Speed Control**  
- Adjust speed in 0.25x increments (0.25x to 2.0x)  
- Visual speed indicator with smooth animations  
- Persistent speed settings across videos and sessions  

**⚡ Smart Shortcuts**  
- **Spacebar**: Tap = Play/Pause | Hold = Fast-forward (configurable speed)  
- **Shift + ↑/↓**: Increase/Decrease speed  
- **Shift + R**: Reset to normal speed (1x)  

**🎨 Enhanced UX**  
- Clean, non-intrusive speed display  
- System-style notifications with fade effects  
- Safe speed limits to prevent audio distortion  

**⚙️ Configurable Settings**  
- **Popup Interface**: Quick access to controls and settings  
- **Hold Speed Selector**: Choose your preferred hold speed (1.25x, 1.5x, 1.75x, 2.0x)  
- **Persistent Configuration**: Settings saved across browser sessions  
- **Visual Shortcuts Guide**: Built-in reference for all keyboard controls  

## 🎮 How to Use  

### Keyboard Controls  
| Shortcut | Action |
|----------|--------|
| **Space** (tap) | Play/Pause video |
| **Space** (hold) | Fast-forward at configured speed |
| **Shift + ↑** | Increase speed by 0.25x |
| **Shift + ↓** | Decrease speed by 0.25x |
| **Shift + R** | Reset speed to 1.0x |

### Extension Popup  
1. Click the extension icon in Chrome toolbar  
2. View keyboard shortcuts reference  
3. Configure hold speed from dropdown (1.25x - 2.0x)  
4. Settings automatically save and apply  

## 📥 Installation  

1. Clone the repository:  
   ```bash
   git clone https://github.com/pedromrtz/crunchyroll_playback_speed.git
   ```

2. Enable Chrome Developer Mode:  
   - Go to `chrome://extensions`  
   - Toggle "Developer mode" ON  

3. Load the extension:  
   - Click "Load unpacked"  
   - Select the extension folder  

4. Enjoy on Crunchyroll!  

## 🙏 Credits  

This project builds upon the original work by:  
[Danny Fan - crunchyroll-playback-speed](https://github.com/dannyfan/crunchyroll-playback-speed)  

### 🔄 What's Improved?  
- **Added popup interface** with visual controls and settings  
- **Configurable hold speed** - choose your preferred fast-forward speed  
- **Persistent configuration** - settings saved in localStorage  
- **Chrome extension messaging** - seamless popup-content communication  
- Added visual feedback for speed changes  
- Implemented persistent speed memory  
- Enhanced shortcut reliability  
- Improved animation smoothness  
- Added safety checks and null protections  

## 💡 Pro Tips  

• **Customize your experience**: Use the popup to set your preferred hold speed  
• **Quick access**: Pin the extension to toolbar for easy settings access  
• Use **Space hold** for temporary speed boost during slow scenes  
• The indicator automatically hides after adjustments  
• Your speed preference stays even after page refresh  
• All settings persist across browser sessions  

## 🛠️ Technical Details  

- **Manifest V3** compatible  
- **Content Script** injection for Crunchyroll pages  
- **LocalStorage** persistence for user preferences  
- **Chrome Extension Messaging** for popup-content communication  
- **Event-driven architecture** with proper cleanup  

Enjoy your anime with perfect pacing! 🎬