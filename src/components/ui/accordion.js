import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef(
  ({ className, ...props }, ref) => (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn("border-none", className)}
      {...props}
    />
  )
);
AccordionItem.displayName = "AccordionItem";

const CustomCheckbox = ({ checked = true, onChange }) => {
  return (
    <div className="relative inline-block">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div 
        className={`w-6 h-6 rounded-sm ${
          checked ? 'bg-[#69A9C2]' : 'bg-white border-2 border-gray-300'
        } flex items-center justify-center cursor-pointer`}
      >
        {checked && (
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 5L5 8.5L12.6 2"
              stroke="white"
              strokeWidth="3px"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

const AccordionTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };

    return (
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
          ref={ref}
          className={cn(
            "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all",
            className
          )}
          onClick={toggleAccordion}
          {...props}
        >
          <div className="flex items-center justify-start gap-2">
            <div className="flex items-center justify-start gap-2">
              <IoMdArrowDropdown 
                className={`text-xl shrink-0 text-muted-foreground transition-transform duration-200 transform ${isOpen ? 'rotate-[360deg]' : 'rotate-[-90deg]'}`} 
              />
              <CustomCheckbox checked={true} onChange={() => {}} />
            </div>
            {children}
          </div>
          <img src="/Header/Layerlist/accordion.svg" alt="" className="w-5 mr-4" />
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    );
  }
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
);
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
