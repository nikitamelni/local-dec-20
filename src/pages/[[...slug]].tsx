import { CANVAS_DRAFT_STATE, CANVAS_PUBLISHED_STATE } from '@uniformdev/canvas';
import { prependLocale, withUniformGetServerSideProps } from '@uniformdev/canvas-next/route';
import { getBreadcrumbs, getRouteClient } from '../utilities/canvas/canvasClients';
import { mergeWithGlobalComposition } from '@/utilities/canvas/compositionManipulations';
export { default } from '../components/BasePage';
// import { createCloudinaryEnhancer, CLOUDINARY_PARAMETER_TYPES } from '@uniformdev/canvas-cloudinary';

// Doc: https://docs.uniform.app/docs/guides/composition/url-management/routing/slug-based-routing

// export const getStaticProps = withUniformGetStaticProps({
//   requestOptions: context => ({
//     state: Boolean(context.preview) ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
//   }),
//   param: 'slug',
//   modifyPath: prependLocale,
//   client: getRouteClient(),
//   handleComposition: async (routeResponse, _context) => {
//     const { composition, errors } = routeResponse.compositionApiResponse || {};

//     if (errors?.some(e => e.type === 'data' || e.type === 'binding')) {
//       return { notFound: true };
//     }

//     const preview = Boolean(_context.preview);
//     const breadcrumbs = await getBreadcrumbs({
//       compositionId: composition._id,
//       preview,
//       dynamicTitle: composition?.parameters?.pageTitle?.value as string,
//       resolvedUrl: _context.params?.slug && _context.params?.slug.length > 0 ? _context.params?.slug[0] : '/',
//     });

//     // await enhance({
//     //   composition,
//     //   /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
//     //   enhancers: new EnhancerBuilder().parameterType(CLOUDINARY_PARAMETER_TYPES, createCloudinaryEnhancer()),
//     //   context: {},
//     // });

//     return {
//       props: { preview, data: composition || null, context: { breadcrumbs } },
//       revalidate: 1,
//     };
//   },
// });

// export const getStaticPaths = async () => ({
//   paths: [],
//   fallback: 'blocking',
// });

export const getServerSideProps = withUniformGetServerSideProps({
  requestOptions: context => ({
    state: Boolean(context.preview) ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
  }),
  client: getRouteClient(),
  modifyPath: prependLocale,
  handleComposition: async (routeResponse, _context) => {
    const { composition, errors } = routeResponse.compositionApiResponse || {};

    if (errors?.some(e => e.type === 'data' || e.type === 'binding')) {
      return { notFound: true };
    }

    const preview = Boolean(_context.preview);
    const breadcrumbs = await getBreadcrumbs({
      compositionId: composition._id,
      preview,
      dynamicTitle: composition?.parameters?.pageTitle?.value as string,
      resolvedUrl: _context.resolvedUrl,
    });

    const finalComposition = await mergeWithGlobalComposition(composition, _context.locale);
    console.log('conetext locale: ', _context.locale);

    return {
      props: { preview, data: finalComposition || null, context: { breadcrumbs } },
    };
  },
});
