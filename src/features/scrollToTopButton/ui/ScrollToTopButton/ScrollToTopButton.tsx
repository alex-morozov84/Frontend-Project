import {memo} from 'react'
import {Icon} from "@/shared/ui/redesigned/Icon";
import CircleIcon from '@/shared/assets/icons/circle-up.svg'

interface ScrollToTopButtonProps {
  className?: string
}

export const ScrollToTopButton = memo(({className}: ScrollToTopButtonProps) => {
  const onClick = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  return (
    <Icon
      clickable
      onClick={onClick}
      width={32}
      height={32}
      Svg={CircleIcon}
      // className={classNames(cls.ScrollToTopButton)}
    />
  );
});