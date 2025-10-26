import { ref } from 'vue';

export interface IHistoryListItem {
  id: string;
  value: number;
}

const MOCK_HISTORY_LIST: IHistoryListItem[] = [
  { id: 'measure-1', value: 80  },
  { id: 'measure-2', value: 79  },
  { id: 'measure-3', value: 85  },
  { id: 'measure-5', value: 76  },
];

const historyList = ref<IHistoryListItem[]>([]);

export function useHistoryList() {

  const isLoadingHistoryList = ref(false);

  function getHistoryList() {
    try {
      isLoadingHistoryList.value = true;

      historyList.value = [ ...MOCK_HISTORY_LIST ];

    } finally {
      isLoadingHistoryList.value = false;
    }
  }

  return {
    historyList,
    isLoadingHistoryList,
    getHistoryList,
  };
}
