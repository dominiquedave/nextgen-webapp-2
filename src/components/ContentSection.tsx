import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

type ContentSectionProps = {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  image?: React.ReactNode;
  reversed?: boolean;
  children?: React.ReactNode;
};

const ContentSection: React.FC<ContentSectionProps> = ({
  id,
  title,
  subtitle,
  description,
  image,
  reversed = false,
  children,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-reveal");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll(".reveal-element");
      elements.forEach((element) => {
        observer.observe(element);
      });
    }

    return () => {
      if (sectionRef.current) {
        const elements = sectionRef.current.querySelectorAll(".reveal-element");
        elements.forEach((element) => {
          observer.unobserve(element);
        });
      }
    };
  }, []);

  return (
    <section id={id} ref={sectionRef} className="py-24">
      <div className="container mx-auto px-6">
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center",
            reversed && "lg:flex-row-reverse"
          )}
        >
          <div className={cn("space-y-8", reversed && "lg:order-2")}>
            <div>
              <div className="reveal-element opacity-0 inline-block mb-4">
                <span className="py-1 px-4 bg-secondary text-sm font-medium rounded-full">
                  {subtitle}
                </span>
              </div>
              <h2 className="reveal-element opacity-0 text-3xl md:text-4xl font-medium mb-6">
                {title}
              </h2>
              <p className="reveal-element opacity-0 text-lg text-muted-foreground">
                {description}
              </p>
            </div>

            {children && (
              <div className="reveal-element opacity-0">{children}</div>
            )}
          </div>

          <div
            className={cn("relative", reversed ? "lg:order-1" : "lg:order-2")}
          >
            <div className="reveal-element opacity-0 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant">
              {image || (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse-subtle">
                  <svg
                    className="w-10 h-10 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                    ></path>
                  </svg>
                </div>
              )}
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-secondary/50 rounded-full blur-2xl"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary/30 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
