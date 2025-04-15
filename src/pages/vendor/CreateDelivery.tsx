// src/pages/vendor/CreateDelivery.tsx - Update to use API
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import VendorLayout from '../../layouts/VendorLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import TextArea from '../../components/common/TextArea';
import Alert from '../../components/common/Alert';
import { useDelivery } from '../../hooks/useDelivery';

// Form validation schema
const deliverySchema = z.object({
    customerName: z.string().min(2, 'Customer name is required'),
    customerPhone: z.string().min(10, 'Valid phone number is required'),
    driverName: z.string().min(2, 'Driver name is required'),
    driverPhone: z.string().min(10, 'Valid phone number is required'),
    packageInfo: z.string().min(2, 'Package information is required'),
    deliveryNotes: z.string().optional(),
});

type DeliveryFormValues = z.infer<typeof deliverySchema>;

const CreateDelivery: React.FC = () => {
    const navigate = useNavigate();
    const [isSuccess, setIsSuccess] = useState(false);
    const { loading, error, createDelivery } = useDelivery();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<DeliveryFormValues>({
        resolver: zodResolver(deliverySchema),
        defaultValues: {
            customerName: '',
            customerPhone: '',
            driverName: '',
            driverPhone: '',
            packageInfo: '',
            deliveryNotes: '',
        },
    });

    const onSubmit = async (data: DeliveryFormValues) => {
        const result = await createDelivery(data);

        if (result) {
            setIsSuccess(true);
            reset();

            // Auto navigate after 2 seconds
            setTimeout(() => {
                navigate(`/vendor/deliveries/${result.id}`);
            }, 2000);
        }
    };

    return (
        <VendorLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-heading font-bold text-neutral-900">
                    Create New Delivery
                </h1>
                <p className="mt-1 text-sm text-neutral-600">
                    Fill in the details to create a new delivery tracking session
                </p>
            </div>

            <Card>
                {error && (
                    <Alert
                        variant="error"
                        title="Error"
                        className="mb-6"
                        onClose={() => {}}
                    >
                        {error}
                    </Alert>
                )}

                {isSuccess ? (
                    <div className="text-center py-8">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-success/20 mb-4">
                            <svg
                                className="h-6 w-6 text-success"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                ></path>
                            </svg>
                        </div>
                        <h2 className="text-lg font-medium text-neutral-900 mb-2">
                            Delivery Created Successfully!
                        </h2>
                        <p className="text-neutral-600 mb-6">
                            An OTP and tracking link have been sent to the driver via WhatsApp.
                        </p>
                        <div className="flex justify-center">
                            <Button
                                variant="primary"
                                onClick={() => setIsSuccess(false)}
                                className="mr-3"
                            >
                                Create Another
                            </Button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Customer Information */}
                            <div>
                                <h3 className="text-lg font-medium text-neutral-900 mb-4">
                                    Customer Information
                                </h3>

                                <Controller
                                    name="customerName"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            label="Customer Name"
                                            placeholder="John Doe"
                                            error={errors.customerName?.message}
                                            {...field}
                                        />
                                    )}
                                />

                                <Controller
                                    name="customerPhone"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            label="Customer Phone Number"
                                            placeholder="+234 800 000 0000"
                                            error={errors.customerPhone?.message}
                                            helpText="WhatsApp enabled number"
                                            {...field}
                                        />
                                    )}
                                />
                            </div>

                            {/* Driver Information */}
                            <div>
                                <h3 className="text-lg font-medium text-neutral-900 mb-4">
                                    Dispatch Rider Information
                                </h3>

                                <Controller
                                    name="driverName"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            label="Driver Name"
                                            placeholder="Michael Smith"
                                            error={errors.driverName?.message}
                                            {...field}
                                        />
                                    )}
                                />

                                <Controller
                                    name="driverPhone"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            label="Driver Phone Number"
                                            placeholder="+234 800 000 0000"
                                            error={errors.driverPhone?.message}
                                            helpText="WhatsApp enabled number"
                                            {...field}
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        {/* Package Information */}
                        <div className="mt-6">
                            <h3 className="text-lg font-medium text-neutral-900 mb-4">
                                Package Information
                            </h3>

                            <Controller
                                name="packageInfo"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        label="Package Description"
                                        placeholder="Clothing items (2kg)"
                                        error={errors.packageInfo?.message}
                                        {...field}
                                    />
                                )}
                            />

                            <Controller
                                name="deliveryNotes"
                                control={control}
                                render={({ field }) => (
                                    <TextArea
                                        label="Delivery Notes (Optional)"
                                        placeholder="Additional instructions for the driver..."
                                        error={errors.deliveryNotes?.message}
                                        rows={3}
                                        className="mt-4"
                                        {...field}
                                    />
                                )}
                            />
                        </div>

                        {/* Form Actions */}
                        <div className="mt-8 flex justify-end">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => navigate('/vendor')}
                                className="mr-3"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                isLoading={loading}
                            >
                                Create Delivery
                            </Button>
                        </div>
                    </form>
                )}
            </Card>
        </VendorLayout>
    );
};

export default CreateDelivery;