import { RootComponentInstance } from '@uniformdev/canvas';
import { getCanvasClient } from './canvasClients';

export const mergeWithGlobalComposition = async (
  composition: RootComponentInstance,
  locale: string | undefined
): Promise<RootComponentInstance> => {
  const canvasClient = getCanvasClient();
  const globalContainerCompositionId = 'f18d7879-6174-4e73-83a5-38b8634f462c';

  const { composition: globalComposition } = await canvasClient.getCompositionById({
    compositionId: globalContainerCompositionId,
    locale: locale ?? undefined,
  });
  return {
    _name: composition?._name,
    _id: composition?._id,
    type: composition?.type,
    parameters: {
      ...composition?.parameters,
      ...globalComposition?.parameters,
    },
    slots: {
      ...(Boolean(globalComposition?.slots?.pageHeader) && {
        pageHeader: globalComposition?.slots?.pageHeader,
      }),
      ...(Boolean(composition?.slots?.pageContent) && {
        pageContent: composition?.slots?.pageContent,
      }),
      ...(Boolean(globalComposition?.slots?.pageFooter) && {
        pageFooter: globalComposition?.slots?.pageFooter,
      }),
      ...(Boolean(globalComposition?.slots?.additional) && {
        additional: globalComposition?.slots?.additional,
      }),
    },
  };
};
