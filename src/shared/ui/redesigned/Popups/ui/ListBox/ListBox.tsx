import {Fragment, ReactNode, useMemo} from 'react'
import { Listbox as HListBox } from '@headlessui/react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { DropdownDirection } from '@/shared/types/ui'
import { Button } from '../../../../redesigned/Button/ui/Button'
import { HStack } from '../../../../redesigned/Stack'
import cls from './ListBox.module.scss'
import { mapDirectionClass } from '../../styles/consts'
import popupCls from '../../styles/popup.module.scss'
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg'
import {Icon} from '../../../Icon';

export interface ListBoxItem<T extends string> {
  value: string
  content: ReactNode
  disabled?: boolean
}

interface ListBoxProps<T extends string> {
  items?: ListBoxItem<T>[]
  className?: string
  value?: T
  defaultValue?: string
  onChange: (value: T) => void
  readonly?: boolean
  direction?: DropdownDirection
  label?: string
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
  const {
    className,
    items,
    onChange,
    value,
    defaultValue,
    readonly,
    direction = 'bottom right',
    label,
  } = props

  const optionClasses = [mapDirectionClass[direction], popupCls.menu]

  const selectedItem = useMemo(() => items?.find(item => item.value === value ), [items, value])

  return (
    <HStack gap="8">
      {label && <span>{`${label}>`}</span>}
      <HListBox
        disabled={readonly}
        as="div"
        className={classNames(cls.ListBox, {}, [className, popupCls.popup])}
        value={value}
        onChange={onChange}
      >
        <HListBox.Button disabled={readonly} className={cls.trigger}>
          <Button variant='filled' disabled={readonly} addonRight={<Icon Svg={ArrowIcon}/>}>
            {selectedItem?.content ?? defaultValue}
          </Button>
        </HListBox.Button>
        <HListBox.Options
          className={classNames(cls.options, {}, optionClasses)}
        >
          {items?.map((item) => (
            <HListBox.Option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(cls.item, {
                    [popupCls.active]: active,
                    [popupCls.disabled]: item.disabled,
                    [popupCls.selected]: selected,
                  })}
                >
                  {selected}
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  )
}