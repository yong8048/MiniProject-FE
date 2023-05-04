import { MouseEvent, useState } from 'react';
import ApplyCalendar from '../ApplyCalendar';
import * as S from './styles';
import { ICalendarInfo } from '../../../interfaces/applicationPage';

function Application() {
  const [select, setSelect] = useState('annual');
  const [date, setDate] = useState({ start_date: '', end_date: '' });
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLButtonElement;
    const select = target.dataset.select;
    if (select) {
      setSelect(select);
    }
  };
  const handleDateSelect = (info: ICalendarInfo) => {
    const { startStr, endStr } = info;
    console.log(startStr, endStr);
  };

  return (
    <S.Wrapper>
      <S.SelectBtns onClick={handleClick}>
        <S.SelectBtn data-select='annual' className={select === 'annual' ? 'active' : ''}>
          연차 신청
        </S.SelectBtn>
        <S.SelectBtn data-select='duty' className={select === 'duty' ? 'active' : ''}>
          당직 신청
        </S.SelectBtn>
      </S.SelectBtns>
      <ApplyCalendar handleDateSelect={handleDateSelect} />
    </S.Wrapper>
  );
}

export default Application;
