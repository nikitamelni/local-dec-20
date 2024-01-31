import { CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE, RootComponentInstance, localize } from '@uniformdev/canvas';
import { getCanvasClient } from './canvasClients';

export const mergeWithGlobalComposition = async (
  composition: RootComponentInstance,
  locale: string | undefined,
  preview: boolean
): Promise<RootComponentInstance> => {
  const canvasClient = getCanvasClient();
  const globalContainerCompositionId = 'f18d7879-6174-4e73-83a5-38b8634f462c';

  const { composition: globalComposition } = await canvasClient.getCompositionById({
    compositionId: globalContainerCompositionId,
    locale: locale ?? undefined,
    state: preview ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
  });

  console.log('=== mergeWithGlobalComposition locale: ', locale);

  localize({ nodes: globalComposition, locale: locale });
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
