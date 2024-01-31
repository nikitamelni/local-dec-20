import { createPreviewHandler } from '@uniformdev/canvas-next';
import { mergeWithGlobalComposition } from '@/utilities/canvas/compositionManipulations';
import { RootComponentInstance } from '@uniformdev/canvas';

// Preview Mode, more info https://nextjs.org/docs/advanced-features/preview-mode
export default createPreviewHandler({
  secret: () => process.env.UNIFORM_PREVIEW_SECRET || 'hello-world',
  playgroundPath: '/playground',
  enhance: async (composition: RootComponentInstance, { req }) => {
    const globalContainerCompositionId = 'f18d7879-6174-4e73-83a5-38b8634f462c';
    if (composition._id === globalContainerCompositionId) {
      // Don't inject the global container composition upon itself
      return;
    }

    const { locale } = req?.previewData;
    console.log('preview locale: ', locale);

    composition = await mergeWithGlobalComposition(composition, locale, true);
  },
});
