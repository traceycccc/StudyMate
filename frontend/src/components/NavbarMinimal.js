import { useState } from 'react';
import {
    Center,
    Tooltip,
    UnstyledButton,
    Stack,
    rem,
    useMantineTheme,
    Modal,
    Button,
    Text,
    TextInput,
    Divider
} from '@mantine/core';
import {
    IconChecklist,
    IconLogout,
    IconUserCircle,
    IconPlus,
    IconX,
    IconCheck
} from '@tabler/icons-react';
import StudyMateLogo from '../assets/StudyMateLogo.svg';
import { useNavigate } from 'react-router-dom';

const NavbarLink = ({ icon: Icon, image, label, active, onClick }) => {
    return (
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
            <UnstyledButton
                onClick={onClick}
                style={{
                    display: 'block',
                    padding: '10px',
                    marginBottom: '10px',
                    marginTop: image ? '23px' : '0'
                }}
            >
                {image ? (
                    <img
                        src={image}
                        alt={label}
                        style={{
                            width: '38px',
                            height: '38px',
                        }}
                    />
                ) : (
                    <Icon style={{ width: rem(24), height: rem(24) }} stroke={1.5} color={active ? 'blue' : 'black'} />
                )}
            </UnstyledButton>
        </Tooltip>
    );
};

export const NavbarMinimal = ({ onLogout }) => {
    const [active, setActive] = useState('home');
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [sessionGoalsOpen, setSessionGoalsOpen] = useState(false);
    const [goals, setGoals] = useState([]);
    const [newGoalText, setNewGoalText] = useState(''); // State for input text
    const navigate = useNavigate();
    const mantineTheme = useMantineTheme();

    const handleLogout = () => {
        setLogoutModalOpen(true);
    };

    const confirmLogout = () => {
        setLogoutModalOpen(false);
        onLogout();
    };

    const toggleGoalModal = () => {
        setSessionGoalsOpen((prev) => !prev);
    };

    const addGoal = () => {
        if (newGoalText.trim() !== '') { // Ensure goal text is not empty
            setGoals([...goals, { text: newGoalText, completed: false }]);
            setNewGoalText(''); // Clear input after adding
        }
    };

    const completeGoal = (index) => {
        const newGoals = goals.map((goal, i) =>
            i === index ? { ...goal, completed: !goal.completed } : goal
        );
        setGoals(newGoals);
    };

    const removeGoal = (index) => {
        const newGoals = goals.filter((_, i) => i !== index);
        setGoals(newGoals);
    };

    return (
        <>
            <nav
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '80px',
                    height: '100vh',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: mantineTheme.colorScheme === 'dark' ? '#43618B' : '#A9D3FC',
                    borderRight: '2px solid #91bfea'
                }}
            >
                <Center>
                    <NavbarLink
                        image={StudyMateLogo}
                        label="Home"
                        active={active === 'modules'}
                        onClick={() => {
                            setActive('modules');
                            navigate('/modules');
                        }}
                    />
                </Center>



                <Stack justify="center" gap={0}>
                    <NavbarLink
                        icon={IconChecklist}
                        label="Session Goals"
                        onClick={toggleGoalModal}
                    />
                    <NavbarLink
                        icon={IconUserCircle}
                        label="Profile"
                        active={active === 'settings'}
                        onClick={() => {
                            setActive('settings');
                            navigate('/settings');
                        }}
                    />
                    <NavbarLink
                        icon={IconLogout}
                        label="Logout"
                        onClick={handleLogout}
                    />
                </Stack>
            </nav>

            {/* Session Goals Modal */}
            <Modal
                opened={sessionGoalsOpen}
                onClose={toggleGoalModal}
                title="Session Goals"
            >
                <div style={{ display: 'flex', gap: '10px' }}> {/* Add spacing between input and button */}
                    <TextInput
                        placeholder="Type a goal..."
                        value={newGoalText} // Bind input text state
                        onChange={(e) => setNewGoalText(e.target.value)}
                        style={{ flexGrow: 1 }}
                    />
                    <Button onClick={addGoal} leftIcon={<IconPlus size={16} />}>
                        Add Goal
                    </Button>
                </div>
                <Divider my="sm" />
                <Text align="center">
                    {goals.filter(goal => !goal.completed).length} Open | {goals.filter(goal => goal.completed).length} Completed
                </Text>
                {goals.map((goal, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                        <Button
                            variant="outline"
                            color={goal.completed ? 'green' : 'gray'}
                            onClick={() => completeGoal(index)}
                            leftIcon={goal.completed ? <IconCheck /> : null}
                            style={{
                                flexGrow: 1, // Take up full width
                                justifyContent: 'flex-start', // Align text to the left
                                textAlign: 'left', // Align button content to the left
                                padding: '10px', // Add padding for better look
                            }}
                        >
                            {goal.completed ? <s>{goal.text}</s> : goal.text}
                        </Button>
                        <Button variant="subtle" color="red" onClick={() => removeGoal(index)}>
                            <IconX size={16} />
                        </Button>
                    </div>
                ))}
            </Modal>

            {/* Logout Confirmation Modal */}
            <Modal
                opened={logoutModalOpen}
                onClose={() => setLogoutModalOpen(false)}
                title="Confirm Logout"
            >
                <Text>Are you sure you want to log out?</Text>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <Button variant="outline" onClick={() => setLogoutModalOpen(false)} style={{ marginRight: '10px' }}>
                        Cancel
                    </Button>
                    <Button color="red" onClick={confirmLogout}>
                        Logout
                    </Button>
                </div>
            </Modal>
        </>
    );
};


