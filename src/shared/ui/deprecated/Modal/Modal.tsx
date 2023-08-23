import React, { ReactNode } from 'react'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'
import { Portal } from '../../redesigned/Portal/Portal'
import { Overlay } from '../../redesigned/Overlay/Overlay'
import cls from './Modal.module.scss'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'

interface ModalProps {
  className?: string
  children?: ReactNode
  isOpen?: boolean
  onClose?: () => void
  lazy?: boolean
}

const ANIMATION_DELAY = 300

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Modal = ({
  className,
  children,
  onClose,
  isOpen,
  lazy,
}: ModalProps) => {
  const { close, isCLosing, isMounted } = useModal({
    animationDelay: ANIMATION_DELAY,
    onClose,
    isOpen,
  })
  const { theme } = useTheme()

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isCLosing,
  }

  if (lazy && !isMounted) {
    return null
  }

  return (
    <Portal>
      <div
        className={classNames(cls.Modal, mods, [className, theme, 'app_modal'])}
      >
        <Overlay onClick={close} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  )
}
