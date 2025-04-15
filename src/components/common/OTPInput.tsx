// src/components/common/OTPInput.tsx
import React, { useRef, useState, useEffect } from 'react';

interface OTPInputProps {
    length: number;
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    error?: string;
    autoFocus?: boolean;
}

const OTPInput: React.FC<OTPInputProps> = ({
                                               length,
                                               value,
                                               onChange,
                                               disabled = false,
                                               error,
                                               autoFocus = true,
                                           }) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [activeInput, setActiveInput] = useState(0);

    // Initialize input values
    useEffect(() => {
        // If the value is longer than the number of inputs, truncate it
        if (value.length > length) {
            onChange(value.slice(0, length));
        }

        // If autoFocus is true, focus the first input
        if (autoFocus && inputRefs.current[0]) {
            inputRefs.current[0]?.focus();
        }
    }, []);

    // Handle focus of inputs
    const handleFocus = (index: number) => () => {
        setActiveInput(index);
    };

    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newValue = e.target.value;

        // Only allow digits
        if (!/^\d*$/.test(newValue)) return;

        // Update the value
        const valueArray = value.split('');

        if (newValue.length > 1) {
            // Handle paste
            const pastedValue = newValue.split('');

            let updatedValue = [...valueArray];
            let i = index;
            let j = 0;

            while (i < length && j < pastedValue.length) {
                updatedValue[i] = pastedValue[j];
                i++;
                j++;
            }

            onChange(updatedValue.join(''));

            // Focus the next input after paste
            if (i < length) {
                inputRefs.current[i]?.focus();
                setActiveInput(i);
            }
        } else if (newValue.length === 1) {
            // Single digit input
            valueArray[index] = newValue;
            onChange(valueArray.join(''));

            // Focus the next input
            if (index < length - 1) {
                inputRefs.current[index + 1]?.focus();
                setActiveInput(index + 1);
            }
        }
    };

    // Handle key down
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !value[index] && index > 0) {
            // Focus the previous input on backspace if current input is empty
            inputRefs.current[index - 1]?.focus();
            setActiveInput(index - 1);
        } else if (e.key === 'ArrowLeft' && index > 0) {
            // Focus the previous input on left arrow
            inputRefs.current[index - 1]?.focus();
            setActiveInput(index - 1);
        } else if (e.key === 'ArrowRight' && index < length - 1) {
            // Focus the next input on right arrow
            inputRefs.current[index + 1]?.focus();
            setActiveInput(index + 1);
        }
    };

    // Handle paste
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text');

        // Only allow digits
        if (!/^\d*$/.test(pasteData)) return;

        const valueArray = value.split('');
        const pastedValue = pasteData.split('');

        let updatedValue = [...valueArray];
        let i = index;
        let j = 0;

        while (i < length && j < pastedValue.length) {
            updatedValue[i] = pastedValue[j];
            i++;
            j++;
        }

        onChange(updatedValue.join(''));

        // Focus the next input after paste
        if (i < length) {
            inputRefs.current[i]?.focus();
            setActiveInput(i);
        }
    };

    return (
        <div>
            <div className="flex justify-center space-x-3">
                {Array.from({ length }, (_, index) => (
                    <input
                        key={index}
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={1}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        value={value[index] || ''}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onFocus={handleFocus(index)}
                        onPaste={(e) => handlePaste(e, index)}
                        disabled={disabled}
                        className={`
              w-12 h-14 text-center text-xl font-medium rounded-md border
              focus:outline-none focus:ring-2 focus:border-transparent
              ${
                            error
                                ? 'border-danger focus:ring-danger'
                                : 'border-neutral-300 focus:ring-primary'
                        }
              ${disabled ? 'bg-neutral-100 text-neutral-400' : 'bg-white'}
            `}
                    />
                ))}
            </div>
            {error && <p className="mt-2 text-sm text-danger text-center">{error}</p>}
        </div>
    );
};

export default OTPInput;
