'use client';

import { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import Image from 'next/image';

const avatarVariants = cva(
  'relative inline-flex items-center justify-center overflow-hidden',
  {
    variants: {
      size: {
        xs: 'w-6 h-6 text-xs',
        sm: 'w-8 h-8 text-sm',
        default: 'w-10 h-10 text-base',
        lg: 'w-12 h-12 text-lg',
        xl: 'w-16 h-16 text-xl',
        '2xl': 'w-20 h-20 text-2xl',
        '3xl': 'w-24 h-24 text-3xl',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-lg',
        rounded: 'rounded-xl',
      },
    },
    defaultVariants: {
      size: 'default',
      shape: 'circle',
    },
  }
);

// Couleurs simples basées sur le nom
const getBackgroundColor = (name: string) => {
  const colors = [
    'bg-purple-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-orange-500',
    'bg-red-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
};

// Extraction des initiales
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  name: string;
}

export function Avatar({
  src,
  alt,
  name,
  size,
  shape,
  className,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const initials = getInitials(name);
  const bgColor = getBackgroundColor(name);

  return (
    <div className={avatarVariants({ size, shape, className })} {...props}>
      {src && !imageError ? (
        <Image
          src={src}
          alt={alt || name}
          fill
          className="object-cover"
          onError={handleImageError}
          sizes="100vw"
        />
      ) : (
        <div
          className={`w-full h-full ${bgColor} flex items-center justify-center`}
        >
          <span className="text-white font-medium">{initials}</span>
        </div>
      )}
    </div>
  );
}
