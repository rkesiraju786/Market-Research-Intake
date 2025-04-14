import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

type AnimationVariant = 
  | "fadeIn" 
  | "fadeInUp" 
  | "fadeInDown" 
  | "fadeInLeft" 
  | "fadeInRight" 
  | "scaleIn" 
  | "scaleInFast";

interface AnimatedContainerProps {
  children: React.ReactNode;
  animation?: AnimationVariant;
  delay?: number;
  className?: string;
}

export function AnimatedContainer({
  children,
  animation = "fadeIn",
  delay = 0,
  className,
}: AnimatedContainerProps) {
  let animationProps = {};
  
  switch (animation) {
    case "fadeIn":
      animationProps = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.5, delay }
      };
      break;
    case "fadeInUp":
      animationProps = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay }
      };
      break;
    case "fadeInDown":
      animationProps = {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay }
      };
      break;
    case "fadeInLeft":
      animationProps = {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.5, delay }
      };
      break;
    case "fadeInRight":
      animationProps = {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.5, delay }
      };
      break;
    case "scaleIn":
      animationProps = {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5, delay }
      };
      break;
    case "scaleInFast":
      animationProps = {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.3, delay }
      };
      break;
    default:
      animationProps = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.5, delay }
      };
  }

  return (
    <motion.div
      className={className}
      {...animationProps}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedList({
  children,
  className,
  delay = 0.1
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: delay,
          },
        },
      }}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        
        return React.cloneElement(child as React.ReactElement, {
          ...child.props,
          className: cn('motion-stagger-item', child.props.className),
        });
      })}
    </motion.div>
  );
}