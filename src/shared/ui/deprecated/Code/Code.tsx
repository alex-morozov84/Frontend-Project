import { memo, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, ButtonTheme } from '../Button/ui/Button'
import CopyIcon from '@/shared/assets/icons/copy-20-20.svg'
import cls from './Code.module.scss'

interface CodeProps {
  className?: string
  text: string
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Code = memo((props: CodeProps) => {
  const { text, className } = props

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text)
  }, [text])

  return (
    <pre className={classNames(cls.Code, {}, [className])}>
      <Button
        onClick={onCopy}
        className={cls.copyBtn}
        theme={ButtonTheme.CLEAR}
      >
        <CopyIcon className={cls.copyIcon} />
      </Button>
      <code>{text}</code>
    </pre>
  )
})
