import { CheckIcon } from '@heroicons/react/24/outline';

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function OnboardingProgress({
  currentStep,
  totalSteps,
}: OnboardingProgressProps) {
  const steps = [
    { id: 1, name: 'Infos personnelles' },
    { id: 2, name: 'Contexte business' },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.id < currentStep
                    ? 'bg-green-500 text-white'
                    : step.id === currentStep
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step.id < currentStep ? (
                  <CheckIcon className="w-4 h-4" />
                ) : (
                  step.id
                )}
              </div>
              <span
                className={`ml-2 text-sm font-medium ${
                  step.id <= currentStep ? 'text-gray-900' : 'text-gray-500'
                }`}
              >
                {step.name}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-full h-0.5 mx-4 ${
                  step.id < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`}
                style={{ width: '60px' }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-2 text-center">
        <span className="text-sm text-gray-500">
          Étape {currentStep} sur {totalSteps}
        </span>
      </div>
    </div>
  );
}
