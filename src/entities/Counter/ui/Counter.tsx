import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/Button';
import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { useCounterActions } from '../model/slice/counterSlice';

interface CounterProps {
  className?: string
}

export const Counter = ({ className }: CounterProps) => {
  const dispatch = useDispatch();
  const counterValue = useCounterValue();
  const { t } = useTranslation();
  const { decrement, increment } = useCounterActions();

  const incrementHandler = () => {
    increment();
  };
  const decrementHandler = () => {
    decrement();
  };

  return (
    <div>
      <h1 data-testid="value-title">{counterValue}</h1>
      <Button
        onClick={incrementHandler}
        data-testid="increment-btn"
      >
        {t('increment')}
      </Button>
      <Button
        onClick={decrementHandler}
        data-testid="decrement-btn"
      >
        {t('decrement')}
      </Button>
    </div>
  );
};
