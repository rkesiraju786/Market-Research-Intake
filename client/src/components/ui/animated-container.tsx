import { cn } from "@/lib/utils";
import { motion, MotionProps } from "framer-motion";
import React from "react";

type AnimationVariant = 
  | "fadeIn" 
  | "fadeInUp" 
  | "fadeInDown" 
  | "fadeInLeft" 
  | "fadeInRight" 
  | "scaleIn" 
  | "scaleInFast" 
  | "staggerItem";

interface AnimatedContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animation?: AnimationVariant;
  delay?: number;
  className?: string;
  motionProps?: MotionProps;
  as?: React.ElementType;
}

export function AnimatedContainer({
  children,
  animation = "fadeIn",
  delay = 0,
  className,
  motionProps,
  as = "div",
  ...props
}: AnimatedContainerProps) {
  const MotionComponent = motion[as as keyof typeof motion] || motion.div;

  const variants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1, 
        transition: { duration: 0.5, delay } 
      }
    },
    fadeInUp: {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.5, delay } 
      }
    },
    fadeInDown: {
      hidden: { opacity: 0, y: -20 },
      visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.5, delay } 
      }
    },
    fadeInLeft: {
      hidden: { opacity: 0, x: -20 },
      visible: { 
        opacity: 1, 
        x: 0, 
        transition: { duration: 0.5, delay } 
      }
    },
    fadeInRight: {
      hidden: { opacity: 0, x: 20 },
      visible: { 
        opacity: 1, 
        x: 0, 
        transition: { duration: 0.5, delay } 
      }
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { 
        opacity: 1, 
        scale: 1, 
        transition: { duration: 0.5, delay } 
      }
    },
    scaleInFast: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { 
        opacity: 1, 
        scale: 1, 
        transition: { duration: 0.3, delay } 
      }
    },
    staggerItem: {
      hidden: { opacity: 0, y: 10 },
      visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.3, delay }
      }
    }
  };

  return (
    <MotionComponent
      initial="hidden"
      animate="visible"
      variants={variants[animation]}
      className={cn(className)}
      {...motionProps}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

export function AnimatedList({
  children,
  staggerDelay = 0.1,
  ...props
}: AnimatedContainerProps & { staggerDelay?: number }) {
  const MotionComponent = motion.div;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <MotionComponent
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        
        return React.cloneElement(child as React.ReactElement, {
          ...child.props,
          className: cn('motion-stagger-item', child.props.className),
        });
      })}
    </MotionComponent>
  );
}