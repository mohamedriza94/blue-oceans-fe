import { useListState } from "@mantine/hooks";
import { TInquiry } from "../types/t";

export const useSelectInquiries = () => {
  const [checkedInquiries, handlers] = useListState<TInquiry["_id"]>([]);

  const toggleCheckbox = (id: TInquiry["_id"]) => {
    if (checkedInquiries.includes(id)) {
      handlers.filter((item) => item !== id);
    } else {
      handlers.append(id);
    }
  };

  const selectAll = (ids: TInquiry["_id"][]) => {
    handlers.setState(ids);
  };

  const clearSelection = () => {
    handlers.setState([]);
  };

  return {
    checkedInquiries,
    toggleCheckbox,
    selectAll,
    clearSelection,
  };
};
