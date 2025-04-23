import {useState} from 'react';
import styled from 'styled-components';
import close from '@/assets/img/close.svg';
import {useEventFilterStore} from '@/store/eventList';
import dropdown from '@/assets/img/dropdown.png';

interface FilterButtonProps {
  label: string;
  options: {id: number; value: string}[];
  selectedValue: {id: number; value: string} | null;
  onSelect: (option: {id: number; value: string}) => void;
  setOpenCalendar: React.Dispatch<React.SetStateAction<boolean>>;
}

function FilterItem({
  label,
  options,
  selectedValue,
  onSelect,
  setOpenCalendar,
}: FilterButtonProps) {
  const {resetCategoryFilter, resetIsFreeFilter, resetDistrictFilter} =
    useEventFilterStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = (e: React.MouseEvent) => {
    setIsOpen(prev => !prev);
    setOpenCalendar(false);
    e.stopPropagation();
  };

  const handleReset = (e: React.MouseEvent) => {
    setIsOpen(false);
    if (label === '카테고리') {
      resetCategoryFilter();
    } else if (label === '유/무료') {
      resetIsFreeFilter();
    } else if (label === '자치구') {
      resetDistrictFilter();
    }
    e.stopPropagation();
  };

  return (
    <>
      <FilterItemContainer>
        {selectedValue ? (
          <TriggerButton onClick={handleClose} $isSelectedValue={true}>
            {selectedValue.value}
            <CloseImage src={close} alt='close' onClick={handleReset} />
          </TriggerButton>
        ) : (
          <TriggerButton onClick={handleClose} $isSelectedValue={false}>
            {label}
            <DropDownImage src={dropdown} alt='dropdown' />
          </TriggerButton>
        )}
        <FilterOptionList $isOpen={isOpen}>
          {options.map((option, idx) => (
            <FilterOption
              key={idx}
              $selected={option === selectedValue}
              onClick={() => {
                setIsOpen(false);
                onSelect(option);
              }}
            >
              {option.value}
            </FilterOption>
          ))}
        </FilterOptionList>
      </FilterItemContainer>
      {isOpen && <Overlay onClick={() => setIsOpen(false)} />}
    </>
  );
}

export const FilterItemContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const TriggerButton = styled.button<{$isSelectedValue: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.48rem 1.2rem;
  width: 100%;
  max-width: max-content;
  height: 3rem;
  font-size: ${props => props.theme.sizes.s};
  background-color: ${props =>
    props.$isSelectedValue
      ? props.theme.colors.secondary
      : props.theme.colors.neutral5};
  color: ${props => props.theme.colors.primary};
  border-radius: 1.6rem;
`;

export const CloseImage = styled.img`
  width: 0.9rem;
  height: 0.9rem;
  margin-left: 0.5rem;
  filter: invert(58%) sepia(30%) saturate(442%) hue-rotate(111deg)
    brightness(92%) contrast(90%);
`;

export const DropDownImage = styled.img`
  width: 1.1rem;
  height: 1.1rem;
  margin: 0.2rem 0 0 0.5rem;
  filter: invert(58%) sepia(30%) saturate(442%) hue-rotate(111deg)
    brightness(92%) contrast(90%);
`;

const FilterOptionList = styled.ul<{$isOpen: boolean}>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 3.2rem;
  left: 50%;
  transform: translateX(-50%);
  min-width: max-content;
  width: 100%;
  background-color: white;
  border-radius: 1.6rem;
  border: 1px solid ${props => props.theme.colors.neutral5};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0.1rem 0.2rem;
  z-index: 10;
  overflow-y: auto;

  max-height: ${({$isOpen}) => ($isOpen ? '20rem' : '0')};
  opacity: ${({$isOpen}) => ($isOpen ? '1' : '0')};
  transition: all 0.3s ease-in-out;
  pointer-events: ${({$isOpen}) => ($isOpen ? 'auto' : 'none')};
`;

const FilterOption = styled.li<{$selected: boolean}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.8rem;
  margin: 0.1rem 0;
  width: 100%;
  font-size: ${props => props.theme.sizes.s};
  color: ${props =>
    props.$selected ? props.theme.colors.primary : props.theme.colors.neutral1};
  background-color: ${props =>
    props.$selected ? props.theme.colors.secondary : 'transparent'};
  border-radius: 1.6rem;
  cursor: pointer;

  &:hover,
  &:active {
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.secondary};
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background: transparent;
`;

export default FilterItem;
