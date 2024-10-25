import { UnstyledButton, Tooltip } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useState } from 'react';

const ThemeToggle = ({ theme, setTheme }) => {
    const [hovered, setHovered] = useState(false);

    const handleThemeToggle = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');  // Toggle theme between light and dark
    };

    const getIcon = () => {
        switch (theme) {
            case 'light':
                return <IconSun size={20} />;
            case 'dark':
                return <IconMoon size={20} />;
            
            default:
                return <IconSun size={20} />;
        }
    };

    return (
        <Tooltip label="Toggle theme" position="right">
            <UnstyledButton
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={handleThemeToggle}
                style={{
                    backgroundColor: hovered ? '#e0e0e0' : 'transparent', // Hover effect
                    padding: '10px',
                    paddingBottom: '4.5px',
                    borderRadius: '50%',
                    transition: 'background-color 0.3s ease',
                    marginBottom: '10px',
                }}
            >
                {getIcon()}
            </UnstyledButton>
        </Tooltip>
    );
};

export default ThemeToggle;
