'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { GradientBackground } from '@/components/ui/gradientBackground';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/progressbar';
import { QuestionCard } from '@/components/ui/questioncard';

// ✅ Define types for better type safety
interface Question {
  id: string;
  question: string;
  type: 'select' | 'text' | 'number';
  options?: string[];
  placeholder?: string;
  validation?: (value: string | number) => boolean;
}

// ✅ Typed questions array
const questions: Question[] = [
  {
    id: 'level',
    question: 'What is your level of study?',
    type: 'select',
    options: ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'],
  },
  {
    id: 'major',
    question: 'What is your major?',
    type: 'text',
    placeholder: 'e.g. Computer Science',
    validation: (value: string) => value.length >= 2,
  },
  {
    id: 'gpa',
    question: 'What is your GPA?',
    type: 'number',
    placeholder: '0.00 - 4.00',
    validation: (value: number) => value >= 0 && value <= 4,
  },
  {
    id: 'financialNeed',
    question: 'Do you have financial need?',
    type: 'select',
    options: ['Yes', 'No', 'Prefer not to say'],
  }
];

export default function Questions() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleNext = async () => {
    const currentQuestion = questions[currentStep];
    const currentAnswer = answers[currentQuestion.id];

    // ✅ Validate input if a validation function exists
    if (currentQuestion.validation && !currentQuestion.validation(currentAnswer)) {
      setError('Please enter a valid value');
      return;
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setError(null);
    } else {
      await handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setError(null);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // TODO: Navigate to results page
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (value: string | number) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentStep].id]: value,
    }));
    setError(null);

    // ✅ Auto-advance on selection for multiple choice
    if (questions[currentStep].type === 'select') {
      setTimeout(handleNext, 500);
    }
  };

  // ✅ Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !loading) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentStep, loading]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <GradientBackground />
      
      {/* Progress bar */}
      <ProgressBar progress={(currentStep + 1) / questions.length} />

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Back button */}
        <AnimatePresence>
          {currentStep > 0 && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={handleBack}
              className="absolute left-8 top-1/2 transform -translate-y-1/2 p-2 
                         text-content-secondary hover:text-content-primary transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Question */}
        <AnimatePresence mode="wait">
          <QuestionCard key={currentStep}>
            <h2 className="text-4xl font-bold tracking-tight text-center mb-8">
              <span className="bg-clip-text text-transparent bg-gradient-to-b 
                             from-content-primary to-content-secondary">
                {questions[currentStep].question}
              </span>
            </h2>

            {questions[currentStep].type === 'select' ? (
              <div className="grid gap-3">
                {questions[currentStep].options?.map((option) => (
                  <Button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    variant={answers[questions[currentStep].id] === option ? 'primary' : 'secondary'}
                    fullWidth
                    icon={ChevronRight}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  type={questions[currentStep].type}
                  placeholder={questions[currentStep].placeholder}
                  value={answers[questions[currentStep].id] || ''}
                  onChange={(e) =>
                    handleAnswer(
                      questions[currentStep].type === 'number'
                        ? parseFloat(e.target.value) || 0
                        : e.target.value
                    )
                  }
                  className={`
                    w-full p-4 bg-white/5 rounded-xl border transition-all duration-200
                    ${error 
                      ? 'border-red-500 shadow-lg shadow-red-500/20' 
                      : 'border-gray-800 focus:ring-1 focus:ring-accent-blue'
                    }
                  `}
                />
                <Button onClick={handleNext} variant="primary" fullWidth>
                  Continue
                </Button>
              </div>
            )}
          </QuestionCard>
        </AnimatePresence>
      </div>
    </div>
  );
}