import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CalendarFilterProps {
  startDate: string | null;
  setStartDate: (date: string | null) => void;
  setIsOpenCalendar: React.Dispatch<React.SetStateAction<boolean>>;
}

function CalendarFilter({
  startDate,
  setStartDate,
  setIsOpenCalendar,
}: CalendarFilterProps) {
  const handleDateChange = (newDate: Value) => {
    if (newDate instanceof Date) {
      const formatted = moment(newDate).format('YYYY-MM-DD');
      setStartDate(formatted);
    } else {
      setStartDate(null);
    }
    setIsOpenCalendar(false);
  };

  return (
    <StyledCalendarWrapper>
      <StyledCalendar
        key={startDate ? 'selected' : 'reset'}
        value={startDate}
        onChange={handleDateChange}
        formatDay={(locale, date) => moment(date).format('D')}
        formatYear={(locale, date) => moment(date).format('YYYY')}
        formatMonthYear={(locale, date) => moment(date).format('YYYY년 MM월')}
        calendarType='gregory'
        showNeighboringMonth={false}
        next2Label={null}
        prev2Label={null}
        minDetail='year'
      />
    </StyledCalendarWrapper>
  );
}

const StyledCalendarWrapper = styled.div`
  padding: 0 0.8rem;

  .react-calendar {
    width: 100%;
    border: 1px solid ${props => props.theme.colors.neutral5};
    border-radius: 1.6rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 3% 5%;
    background-color: white;
    color: ${props => props.theme.colors.neutral1};
  }

  // 네비게이션 버튼
  .react-calendar__navigation button:focus {
    background-color: white;
  }

  .react-calendar__navigation button:hover {
    background: ${props => props.theme.colors.secondary};
  }

  .react-calendar__navigation button:disabled {
    background-color: white;
  }

  .react-calendar__tile--hasActive {
    background-color: ${props => props.theme.colors.primary};
    abbr {
      color: ${props => props.theme.colors.primary};
    }
  }

  // 요일 밑줄 제거
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
  }

  // 주말 폰트 컬러 변경
  .react-calendar__month-view__days__day--weekend {
    color: ${props => props.theme.colors.neutral1};
  }

  // hover 했을 때
  .react-calendar__tile:enabled:hover {
    background: ${props => props.theme.colors.secondary};
  }

  // 오늘 날짜
  .react-calendar__tile--now {
    background: white;
    color: ${props => props.theme.colors.primary};
  }

  .react-calendar__tile--active,
  .react-calendar__tile:enabled:focus {
    background: ${props => props.theme.colors.primary} !important;
    color: white;
  }
`;

const StyledCalendar = styled(Calendar)``;

export default CalendarFilter;
