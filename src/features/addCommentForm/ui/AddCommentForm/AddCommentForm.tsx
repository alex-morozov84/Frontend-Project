import { useTranslation } from 'react-i18next'
import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Input } from '@/shared/ui/deprecated/Input'
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { HStack } from '@/shared/ui/redesigned/Stack'
import {
  addCommentFormActions,
  addCommentFormReducer,
} from '../../model/slices/addCommentFromSlice'
import {
  getAddCommentFormError,
  getAddCommentFormText,
} from '../../model/selectors/addCommentFormSelectors'
import cls from './AddCommentForm.module.scss'

export interface AddCommentFormProps {
  className?: string
  onSendComment: (text: string) => void
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
}

const AddCommentForm = memo(
  ({ className, onSendComment }: AddCommentFormProps) => {
    const { t } = useTranslation()
    const error = useSelector(getAddCommentFormError)
    const text = useSelector(getAddCommentFormText)
    const dispatch = useAppDispatch()

    const onCommentTextChange = useCallback(
      (value: string) => {
        dispatch(addCommentFormActions.setText(value))
      },
      [dispatch],
    )

    const onSendHandler = useCallback(() => {
      onSendComment(text || '')
      onCommentTextChange('')
    }, [onCommentTextChange, onSendComment, text])

    return (
      <DynamicModuleLoader reducers={reducers}>
        <HStack
          data-testid="AddCommentForm"
          justify="between"
          max
          className={classNames(cls.AddCommentForm, {}, [className])}
        >
          <Input
            data-testid="AddCommentForm.Input"
            className={cls.input}
            placeholder={t('Введите текст комментария')}
            value={text}
            onChange={onCommentTextChange}
          />
          <Button
            data-testid="AddCommentForm.Button"
            theme={ButtonTheme.OUTLINE}
            onClick={onSendHandler}
          >
            {t('Отправить')}
          </Button>
        </HStack>
      </DynamicModuleLoader>
    )
  },
)

export default AddCommentForm
