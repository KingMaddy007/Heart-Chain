'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { categoryLabels, Campaign } from '@/data/mockData';

type Step = 1 | 2 | 3 | 4 | 5;

interface FormData {
    title: string;
    category: Campaign['category'] | '';
    goalAmount: string;
    story: string;
    impactPlan: string;
    image: File | null;
}

const steps = [
    { number: 1, title: 'Basic Info' },
    { number: 2, title: 'Story & Media' },
    { number: 3, title: 'Impact Plan' },
    { number: 4, title: 'Verification' },
    { number: 5, title: 'Review' },
];

export default function CreateCampaignPage() {
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [formData, setFormData] = useState<FormData>({
        title: '',
        category: '',
        goalAmount: '',
        story: '',
        impactPlan: '',
        image: null,
    });

    const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
        if (currentStep < 5) setCurrentStep((prev) => (prev + 1) as Step);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep((prev) => (prev - 1) as Step);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                Campaign Title *
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => updateField('title', e.target.value)}
                                placeholder="Give your campaign a compelling title"
                                className="w-full px-4 py-3 border-2 border-[var(--beige-300)] rounded-xl focus:border-[var(--accent)] focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                Category *
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) => updateField('category', e.target.value as Campaign['category'])}
                                className="w-full px-4 py-3 border-2 border-[var(--beige-300)] rounded-xl focus:border-[var(--accent)] focus:outline-none bg-white"
                            >
                                <option value="">Select a category</option>
                                {(Object.keys(categoryLabels) as Campaign['category'][]).map((cat) => (
                                    <option key={cat} value={cat}>
                                        {categoryLabels[cat]}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                Fundraising Goal *
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]">$</span>
                                <input
                                    type="number"
                                    value={formData.goalAmount}
                                    onChange={(e) => updateField('goalAmount', e.target.value)}
                                    placeholder="0"
                                    className="w-full pl-8 pr-4 py-3 border-2 border-[var(--beige-300)] rounded-xl focus:border-[var(--accent)] focus:outline-none"
                                />
                            </div>
                            <p className="text-sm text-[var(--text-secondary)] mt-2">
                                Set a realistic goal that covers your needs.
                            </p>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                Campaign Story *
                            </label>
                            <textarea
                                value={formData.story}
                                onChange={(e) => updateField('story', e.target.value)}
                                placeholder="Tell your story. Why are you raising funds? What will the money be used for? Be specific and heartfelt."
                                rows={8}
                                className="w-full px-4 py-3 border-2 border-[var(--beige-300)] rounded-xl focus:border-[var(--accent)] focus:outline-none resize-none"
                            />
                            <p className="text-sm text-[var(--text-secondary)] mt-2">
                                {formData.story.length}/2000 characters
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                Campaign Image
                            </label>
                            <div className="border-2 border-dashed border-[var(--beige-400)] rounded-xl p-8 text-center hover:border-[var(--accent)] transition-colors cursor-pointer">
                                <div className="text-4xl mb-2">📸</div>
                                <p className="text-[var(--text-primary)] font-medium">Click to upload image</p>
                                <p className="text-sm text-[var(--text-secondary)]">PNG, JPG up to 5MB</p>
                            </div>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                Impact Plan *
                            </label>
                            <p className="text-sm text-[var(--text-secondary)] mb-4">
                                Explain how the funds will be used. Break down the costs to build trust with donors.
                            </p>
                            <textarea
                                value={formData.impactPlan}
                                onChange={(e) => updateField('impactPlan', e.target.value)}
                                placeholder="Example:
- $5,000 - Medical supplies and equipment
- $3,000 - Hospital fees
- $2,000 - Recovery and rehabilitation
- $500 - Transportation costs"
                                rows={8}
                                className="w-full px-4 py-3 border-2 border-[var(--beige-300)] rounded-xl focus:border-[var(--accent)] focus:outline-none resize-none font-mono text-sm"
                            />
                        </div>

                        <div className="bg-[var(--beige-100)] rounded-xl p-4">
                            <p className="text-sm text-[var(--text-secondary)]">
                                💡 <strong>Tip:</strong> Campaigns with detailed fund breakdowns receive 40% more donations on average.
                            </p>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="space-y-6">
                        <div className="bg-[var(--beige-100)] rounded-xl p-6">
                            <h3 className="font-bold text-[var(--text-primary)] mb-2">Why Verification?</h3>
                            <p className="text-sm text-[var(--text-secondary)]">
                                Verified campaigns receive a trust badge and are more likely to reach their goals. All documents are kept private and secure.
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                ID Verification
                            </label>
                            <div className="border-2 border-dashed border-[var(--beige-400)] rounded-xl p-6 text-center hover:border-[var(--accent)] transition-colors cursor-pointer">
                                <div className="text-3xl mb-2">🪪</div>
                                <p className="text-[var(--text-primary)] font-medium">Upload Government ID</p>
                                <p className="text-xs text-[var(--text-secondary)]">This will not be shown publicly</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                Supporting Documents (Optional)
                            </label>
                            <div className="border-2 border-dashed border-[var(--beige-400)] rounded-xl p-6 text-center hover:border-[var(--accent)] transition-colors cursor-pointer">
                                <div className="text-3xl mb-2">📄</div>
                                <p className="text-[var(--text-primary)] font-medium">Upload supporting documents</p>
                                <p className="text-xs text-[var(--text-secondary)]">Medical bills, invoices, etc.</p>
                            </div>
                        </div>
                    </div>
                );

            case 5:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <div className="text-5xl mb-4">🎉</div>
                            <h2 className="text-2xl font-bold text-[var(--text-primary)]">Review Your Campaign</h2>
                            <p className="text-[var(--text-secondary)]">Make sure everything looks good before submitting.</p>
                        </div>

                        <div className="bg-[var(--beige-100)] rounded-xl p-6 space-y-4">
                            <div>
                                <p className="text-sm text-[var(--text-secondary)]">Title</p>
                                <p className="font-bold text-[var(--text-primary)]">{formData.title || 'Not provided'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-[var(--text-secondary)]">Category</p>
                                <p className="font-medium text-[var(--text-primary)]">
                                    {formData.category ? categoryLabels[formData.category] : 'Not selected'}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-[var(--text-secondary)]">Goal Amount</p>
                                <p className="font-bold text-[var(--accent)]">
                                    {formData.goalAmount ? `$${parseInt(formData.goalAmount).toLocaleString()}` : 'Not set'}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-[var(--text-secondary)]">Story Preview</p>
                                <p className="text-[var(--text-primary)] line-clamp-3">
                                    {formData.story || 'Not provided'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
                            <span className="text-xl">⚠️</span>
                            <div>
                                <p className="font-medium text-amber-800">Before you submit</p>
                                <p className="text-sm text-amber-700">
                                    Your campaign will be reviewed by our team within 24-48 hours. Make sure all information is accurate.
                                </p>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-[var(--beige-100)] py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
                        Start a Campaign
                    </h1>
                    <p className="text-[var(--text-secondary)]">
                        Create a campaign to raise funds for a cause you care about.
                    </p>
                </motion.div>

                {/* Progress Steps */}
                <div className="mb-12">
                    <div className="flex items-center justify-between">
                        {steps.map((step, index) => (
                            <div key={step.number} className="flex items-center">
                                <div
                                    className={`flex flex-col items-center ${index < steps.length - 1 ? 'flex-1' : ''
                                        }`}
                                >
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${currentStep >= step.number
                                                ? 'bg-[var(--accent)] text-white'
                                                : 'bg-[var(--beige-300)] text-[var(--text-secondary)]'
                                            }`}
                                    >
                                        {currentStep > step.number ? '✓' : step.number}
                                    </div>
                                    <p className="text-xs text-[var(--text-secondary)] mt-2 hidden md:block">
                                        {step.title}
                                    </p>
                                </div>
                                {index < steps.length - 1 && (
                                    <div
                                        className={`flex-1 h-1 mx-2 rounded-full transition-colors ${currentStep > step.number
                                                ? 'bg-[var(--accent)]'
                                                : 'bg-[var(--beige-300)]'
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Card */}
                <motion.div
                    key={currentStep}
                    className="bg-white rounded-2xl p-8 shadow-soft border border-[var(--card-border)]"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">
                        {steps[currentStep - 1].title}
                    </h2>

                    {renderStep()}

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--beige-200)]">
                        <button
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className="px-6 py-3 text-[var(--text-secondary)] font-medium hover:text-[var(--text-primary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            ← Back
                        </button>

                        {currentStep < 5 ? (
                            <button
                                onClick={nextStep}
                                className="px-8 py-3 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
                            >
                                Continue →
                            </button>
                        ) : (
                            <button
                                className="px-8 py-3 bg-gradient-to-r from-[var(--success)] to-[#7BA828] text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
                            >
                                🚀 Submit Campaign
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* Save Draft Button */}
                <div className="text-center mt-6">
                    <button className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
                        Save as Draft
                    </button>
                </div>
            </div>
        </div>
    );
}
