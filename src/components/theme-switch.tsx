'use client'

import { SwitchProps, useSwitch } from '@heroui/switch'
import { Tooltip } from '@heroui/tooltip'
import { useIsSSR } from '@react-aria/ssr'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import clsx from 'clsx'
import { useTheme } from 'next-themes'
import { FC } from 'react'

import { MoonFilledIcon, SunFilledIcon } from '@/components/icons'

export interface ThemeSwitchProps {
  className?: string
  classNames?: SwitchProps['classNames']
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
}) => {
  const { theme, setTheme } = useTheme()
  const isSSR = useIsSSR()

  const onChange = () => setTheme(theme === 'light' ? 'dark' : 'light')

  const {
    Component,
    domRef,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    isSelected: theme === 'light' || isSSR,
    'aria-label': `${theme === 'light' || isSSR ? 'Темная' : 'Светлая'} тема`,
    onChange,
  })

  return (
    <Tooltip content={`${theme === 'light' ? 'Темная' : 'Светлая'} тема`}>
      <Component
        {...getBaseProps({
          className: clsx(
            'px-px transition-opacity hover:opacity-80 cursor-pointer',
            className,
            classNames?.base
          ),
        })}
        ref={domRef}
      >
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: clsx(
              [
                'w-auto h-auto',
                'bg-transparent',
                'rounded-lg',
                'flex items-center justify-center',
                'group-data-[selected=true]:bg-transparent',
                '!text-default-500',
                'pt-px',
                'px-0',
                'mx-0',
              ],
              classNames?.wrapper
            ),
          })}
        >
          {!isSelected || isSSR ? (
            <SunFilledIcon size={22} />
          ) : (
            <MoonFilledIcon size={22} />
          )}
        </div>
      </Component>
    </Tooltip>
  )
}
