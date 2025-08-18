export const getRandomColor = () => {
    const colors = [
        'red', 'green', 'blue', 'indigo', 'yellow', 'purple', 'pink', 'rose', 'orange', 'amber',
        'lime', 'teal', 'cyan', 'sky', 'emerald', 'fuchsia', 'violet', 'slate', 'neutral',
        'zinc', 'stone', 'gray'
    ]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    return randomColor
}