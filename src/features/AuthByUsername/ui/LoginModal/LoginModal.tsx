import { Suspense } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Modal } from '@/shared/ui/deprecated/Modal'
import { Loader } from '@/shared/ui/deprecated/Loader'
import { LoginFormAsync } from '../LoginForm/LoginForm.async'

interface LoginModalProps {
  className?: string
  isOpen: boolean
  onClose: () => void
}

export const LoginModal = ({ className, onClose, isOpen }: LoginModalProps) => (
  <Modal className={classNames('')} onClose={onClose} isOpen={isOpen} lazy>
    <Suspense fallback={<Loader />}>
      <LoginFormAsync onSuccess={onClose} />
    </Suspense>
  </Modal>
)
