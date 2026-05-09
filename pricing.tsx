import { Check, Minus, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Get organized and track your syllabus.',
    buttonText: 'Get Started',
    buttonClass: 'bg-zinc-800 text-white hover:bg-zinc-700',
    popular: false,
  },
  {
    name: 'Pro',
    price: '₹299',
    period: '/mo',
    description: 'Unlock Vidya AI and spaced-repetition.',
    buttonText: 'Upgrade to Pro',
    buttonClass: 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20',
    popular: true,
  },
  {
    name: 'Legend',
    price: '₹599',
    period: '/mo',
    description: 'The ultimate OS for 95%+ board achievers.',
    buttonText: 'Go Legend',
    buttonClass: 'bg-zinc-800 text-white hover:bg-zinc-700',
    popular: false,
  },
];

const featureCategories = [
  {
    category: 'Core Productivity',
    features: [
      { name: 'Syllabus Tracker', values: [true, true, true] },
      { name: 'Drag & Drop Study Sessions', values: [true, true, true] },
      { name: 'Focus Timers (Pomodoro)', values: [true, true, true] },
      { name: 'Smart Notes Storage', values: ['50 Notes', 'Unlimited', 'Unlimited'] },
    ],
  },
  {
    category: 'Vidya AI Superpowers',
    features: [
      { name: 'AI Doubt Resolution', values: ['10 / day', 'Unlimited', 'Unlimited'] },
      { name: 'AI Chapter Summaries', values: [false, true, true] },
      { name: 'Auto-generated Flashcards', values: [false, true, true] },
      { name: 'Priority Processing (GPT-4)', values: [false, false, true] },
    ],
  },
  {
    category: 'Gamification & Growth',
    features: [
      { name: 'XP & Daily Streaks', values: [true, true, true] },
      { name: 'Streak Shields', values: [false, '2 / month', '5 / month'] },
      { name: 'Advanced Growth Analytics', values: [false, true, true] },
      { name: 'Custom Pixel OS Themes', values: [false, true, true] },
    ],
  },
  {
    category: 'Marketplace',
    features: [
      { name: 'Buy Study Materials', values: [true, true, true] },
      { name: 'Sell Your Notes', values: [false, true, true] },
      { name: 'Transaction Fee', values: ['15%', '5%', '0%'] },
    ],
  },
];

export default function App() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName);
    setTimeout(() => {
      setSelectedPlan(null);
    }, 2000); // Reset after 2 seconds
  };

  const getPrice = (plan: any) => {
    if (billingCycle === 'yearly' && plan.price !== 'Free') {
      return `₹${Math.floor(parseInt(plan.price.replace('₹', '')) * 0.8)}`;
    }
    return plan.price;
  };

  const renderValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="mx-auto h-5 w-5 text-indigo-500" strokeWidth={3} />
      ) : (
        <Minus className="mx-auto h-5 w-5 text-zinc-400" />
      );
    }
    return <span className="text-zinc-900 font-medium font-mono text-sm">{value}</span>;
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 selection:bg-indigo-100 selection:text-indigo-900 pb-20">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium mb-6 font-mono">
          <span className="flex h-2 w-2 rounded-full bg-indigo-600"></span>
          VidyaOS v2.0 Pricing
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-4">
          Ready to learn like you mean it?
        </h1>
        <p className="text-lg text-zinc-600 max-w-2xl mx-auto mb-10">
          The OS that grows with you — from Class 9 to Board exams. Compare our plans and choose the blueprint that fits your study style.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-3">
          <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-zinc-900' : 'text-zinc-500'}`}>Monthly</span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-zinc-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm font-medium flex items-center gap-2 ${billingCycle === 'yearly' ? 'text-zinc-900' : 'text-zinc-500'}`}>
            Yearly <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold leading-none tracking-wide uppercase">Save 20%</span>
          </span>
        </div>
      </div>

      {/* Pricing Comparison Table Desktop */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 hidden lg:block">
        <table className="w-full text-left border-collapse">
          {/* Table Header (Sticky) */}
          <thead className="sticky top-0 bg-zinc-50/90 backdrop-blur-md z-10">
            <tr>
              <th className="w-1/4 pb-8 pl-4 pr-4 align-bottom">
                <div className="text-xl font-bold font-mono tracking-tight">Compare plans</div>
              </th>
              {plans.map((plan, index) => (
                <th key={index} className="w-1/4 pb-8 px-4 text-center align-bottom relative">
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6">
                      <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className={`rounded-3xl p-6 border ${plan.popular ? 'border-indigo-200 bg-white shadow-xl shadow-indigo-900/5' : 'border-zinc-200 bg-white'}`}>
                    <h3 className="text-lg font-bold text-zinc-900 mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-1 mb-4 h-[40px]">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={getPrice(plan)}
                          initial={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                          transition={{ duration: 0.2 }}
                          className="text-4xl font-bold tracking-tight text-zinc-900 inline-block"
                        >
                          {getPrice(plan)}
                        </motion.span>
                      </AnimatePresence>
                      {plan.price !== 'Free' && <span className="text-sm text-zinc-500 font-medium">{plan.period}</span>}
                    </div>
                    <p className="text-xs text-zinc-500 mb-6 h-8 text-balance">{plan.description}</p>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePlanSelect(plan.name)}
                      className={`w-full py-2.5 px-4 rounded-xl font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 relative overflow-hidden ${plan.buttonClass}`}
                    >
                      <AnimatePresence mode="wait">
                        {selectedPlan === plan.name ? (
                          <motion.span
                            key="selected"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.15 }}
                            className="flex items-center justify-center gap-2"
                          >
                            <Check className="w-4 h-4" strokeWidth={3} /> Selected
                          </motion.span>
                        ) : (
                          <motion.span
                            key="default"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.15 }}
                            className="block"
                          >
                            {plan.buttonText}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-zinc-200 border-t border-zinc-200">
            {featureCategories.map((group, groupIdx) => (
              <React.Fragment key={groupIdx}>
                <tr>
                  <th
                    colSpan={4}
                    className="py-6 pl-4 text-sm font-bold tracking-wider text-zinc-900 uppercase pt-12"
                  >
                    {group.category}
                  </th>
                </tr>
                {group.features.map((feature, featureIdx) => (
                  <tr key={featureIdx} className="hover:bg-black/[0.02] transition-colors">
                    <td className="py-4 pl-4 pr-4 border-b border-zinc-100">
                      <div className="flex items-center gap-2 group/tooltip relative">
                        <span className="text-sm font-medium text-zinc-700">{feature.name}</span>
                        <Info className="h-4 w-4 text-zinc-400 cursor-help" />
                        
                      </div>
                    </td>
                    {feature.values.map((value, valIdx) => (
                      <td key={valIdx} className="py-4 px-4 text-center border-b border-zinc-100">
                        {renderValue(value)}
                      </td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pricing Comparison Mobile View */}
      <div className="max-w-3xl mx-auto px-4 mt-8 lg:hidden space-y-16">
        {plans.map((plan, planIdx) => (
          <div key={planIdx} className={`rounded-3xl border ${plan.popular ? 'border-indigo-600 shadow-xl' : 'border-zinc-200'} bg-white overflow-hidden relative`}>
            {plan.popular && (
              <div className="bg-indigo-600 text-white text-xs font-bold py-1.5 text-center uppercase tracking-wider">
                Most Popular
              </div>
            )}
            <div className="p-6 sm:p-8">
              <h3 className="text-xl font-bold text-zinc-900 mb-2">{plan.name}</h3>
              <p className="text-sm text-zinc-500 mb-6">{plan.description}</p>
              <div className="flex items-baseline gap-1 mb-8 h-[40px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={getPrice(plan)}
                    initial={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                    transition={{ duration: 0.2 }}
                    className="text-4xl font-bold tracking-tight text-zinc-900 inline-block"
                  >
                    {getPrice(plan)}
                  </motion.span>
                </AnimatePresence>
                {plan.price !== 'Free' && <span className="text-sm text-zinc-500 font-medium">{plan.period}</span>}
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePlanSelect(plan.name)}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all mb-8 relative overflow-hidden ${plan.buttonClass}`}
              >
                <AnimatePresence mode="wait">
                  {selectedPlan === plan.name ? (
                    <motion.span
                      key="selected"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" strokeWidth={3} /> Selected
                    </motion.span>
                  ) : (
                    <motion.span
                      key="default"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                      className="block"
                    >
                      {plan.buttonText}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <div className="space-y-8 h-[1px] w-full bg-zinc-100 shadow-sm" />
              
              <div className="mt-8 space-y-6">
                {featureCategories.map((group, groupIdx) => (
                  <div key={groupIdx}>
                    <h4 className="text-xs font-bold tracking-wider text-zinc-900 uppercase mb-4">
                      {group.category}
                    </h4>
                    <ul className="space-y-3">
                      {group.features.map((feature, featureIdx) => {
                        const val = feature.values[planIdx];
                        // Only show feature if it's available or has a string value (limit) for this plan
                        if (val === false) return null;
                        
                        return (
                          <li key={featureIdx} className="flex items-start gap-3 text-sm text-zinc-700">
                            {typeof val === 'boolean' && val === true ? (
                              <Check className="h-5 w-5 text-indigo-500 shrink-0" strokeWidth={3} />
                            ) : (
                              <div className="h-5 w-5 flex items-center justify-center shrink-0">
                                <Check className="h-4 w-4 text-indigo-300" strokeWidth={3} />
                              </div>
                            )}
                            <div className="flex-1">
                              <span className="font-medium text-zinc-900">{typeof val === 'string' ? val : ''}</span>
                              {typeof val === 'string' ? ' ' : ''}
                              <span className={typeof val === 'string' ? 'text-zinc-500' : ''}>{feature.name}</span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

