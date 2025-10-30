# University of Oklahoma To-Do List App

A React Native mobile application for managing personal tasks with University of Oklahoma branding and colors.

## Features

- ✅ **FlatList Implementation**: Efficient scrolling list for displaying todo items
- ✅ **Modal Screen**: Clean interface for adding new todo items
- ✅ **Add/Delete Functionality**: Complete CRUD operations for todo management
- ✅ **Delete All**: Bulk delete functionality with confirmation
- ✅ **OU Branding**: Official Oklahoma Sooners logo and color scheme
- ✅ **Landscape Support**: Optimized layout for both portrait and landscape modes
- ✅ **Modern UI**: Clean, accessible design with proper contrast

## Technologies Used

- **React Native** (0.82.1) - Cross-platform mobile framework
- **TypeScript** - Type-safe JavaScript
- **React Hooks** - State management with useState
- **React Native Core Components**:
  - FlatList
  - Modal
  - TouchableOpacity
  - TextInput
  - Alert
  - SafeAreaView

## Installation & Setup

### Prerequisites
- Node.js (>= 20)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JarviousX/Assignment-3-Developing-a-To-Do-List-with-React-Native.git
   cd Assignment-3-Developing-a-To-Do-List-with-React-Native
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Run the application**
   
   For Android:
   ```bash
   npm run android
   ```
   
   For iOS:
   ```bash
   npm run ios
   ```

## Usage

### Adding a Todo
1. Tap the red "+" button in the bottom-right corner
2. Enter your todo item in the modal
3. Tap "Add Todo" to save

### Completing a Todo
1. Tap the checkbox next to any todo item
2. The item will be marked as completed with a strikethrough

### Deleting a Todo
1. Tap the trash can icon next to any todo item
2. Confirm deletion in the alert dialog

### Delete All Todos
1. Tap the cream-colored trash button above the add button
2. Confirm deletion of all todos

## Technical Details

### Core Components
- **FlatList**: Efficient rendering of todo items with proper key extraction
- **Modal**: Slide-up animation for adding new todos
- **TouchableOpacity**: Interactive buttons and todo items
- **Alert**: Confirmation dialogs for delete operations
- **SafeAreaView**: Proper handling of device safe areas

### State Management
- React hooks (useState) for local state management
- Todo items stored in array with unique IDs
- Modal visibility controlled by boolean state

### Styling
- StyleSheet for optimized styling
- OU color palette (Crimson #841617 and Cream #FDF5DC)
- Shadow effects for depth
- Responsive design with orientation support

## File Structure

```
TodoListApp/
├── App.tsx                 # Main application component
├── index.js               # Entry point
├── package.json           # Dependencies and scripts
├── android/               # Android-specific files
├── ios/                   # iOS-specific files
└── Oklahoma_Sooners_logo.svg.png  # OU logo asset
```

## Development

- Built with React Native 0.82.1
- TypeScript support included
- ESLint configuration for code quality
- Jest testing framework setup

---

**Repository**: [GitHub](https://github.com/JarviousX/Assignment-3-Developing-a-To-Do-List-with-React-Native.git)
