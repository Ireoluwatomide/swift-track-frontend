// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-primary/5 to-neutral-50">
            <MainLayout>
                <div className="container mx-auto px-4 py-12">
                    {/* Hero Section */}
                    <div className="text-center max-w-4xl mx-auto mb-16">
                        <h1 className="text-3xl md:text-5xl font-heading font-bold text-neutral-900 mb-6">
                            Real-time Delivery Tracking with WhatsApp
                        </h1>
                        <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-3xl mx-auto">
                            Seamlessly coordinate deliveries between dispatch riders and customers with
                            real-time location tracking shared via WhatsApp.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/vendor">
                                <Button variant="primary" size="lg">
                                    Vendor Dashboard
                                </Button>
                            </Link>
                            <Link to="/track">
                                <Button variant="secondary" size="lg">
                                    Track a Delivery
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <FeatureCard
                            icon={
                                <svg
                                    className="w-8 h-8 text-primary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    ></path>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    ></path>
                                </svg>
                            }
                            title="Real-time Location Tracking"
                            description="Monitor deliveries in real-time without requiring app downloads. Works with any browser."
                        />
                        <FeatureCard
                            icon={
                                <svg
                                    className="w-8 h-8 text-primary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    ></path>
                                </svg>
                            }
                            title="WhatsApp Integration"
                            description="Share tracking links directly via WhatsApp for a seamless customer experience."
                        />
                        <FeatureCard
                            icon={
                                <svg
                                    className="w-8 h-8 text-primary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    ></path>
                                </svg>
                            }
                            title="Secure Authentication"
                            description="OTP verification for drivers ensures secure and authorized access to tracking."
                        />
                    </div>

                    {/* How It Works Section */}
                    <div className="mb-16">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-neutral-900 text-center mb-12">
                            How It Works
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <StepCard
                                number="1"
                                title="Create a Delivery"
                                description="Vendors enter customer and driver details, then generate a unique tracking ID."
                            />
                            <StepCard
                                number="2"
                                title="Driver Authorization"
                                description="Driver receives a tracking link and OTP via WhatsApp to start location sharing."
                            />
                            <StepCard
                                number="3"
                                title="Customer Tracking"
                                description="Customer receives a link to track the delivery's progress in real-time."
                            />
                        </div>
                    </div>

                    {/* CTA Section */}
                    <Card className="max-w-4xl mx-auto text-center p-8 md:p-12">
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-neutral-900 mb-4">
                            Ready to simplify your delivery management?
                        </h2>
                        <p className="text-lg text-neutral-600 mb-8">
                            Start tracking your deliveries in real-time with our WhatsApp integrated solution.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/vendor">
                                <Button variant="primary" size="lg">
                                    Get Started
                                </Button>
                            </Link>
                            <Link to="/track">
                                <Button variant="outline" size="lg">
                                    View Demo
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            </MainLayout>
        </div>
    );
};

// Feature Card Component
interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
    return (
        <Card className="text-center p-6 hover:shadow-md transition-shadow duration-300">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-2">
                {title}
            </h3>
            <p className="text-neutral-600">{description}</p>
        </Card>
    );
};

// Step Card Component
interface StepCardProps {
    number: string;
    title: string;
    description: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description }) => {
    return (
        <div className="relative pl-12">
            <div className="absolute left-0 top-0 flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold">
                {number}
            </div>
            <h3 className="text-xl font-heading font-semibold text-neutral-900 mb-2">
                {title}
            </h3>
            <p className="text-neutral-600">{description}</p>
        </div>
    );
};

export default Home;
