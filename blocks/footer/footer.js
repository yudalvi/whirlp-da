import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

import {
  getLanguage, getSiteName, PATH_PREFIX,
} from '../../scripts/utils.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const siteName = await getSiteName();
  const footerPath = footerMeta
    ? new URL(footerMeta, window.location).pathname
    : `/content/${siteName}${PATH_PREFIX}/footer`;

  /*
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  //const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const pathSegments = window.location.pathname.split('/').filter(Boolean);
  //console.log("pathSegments footer: ", pathSegments);
  const parentPath = pathSegments.length > 2 ? `/${pathSegments.slice(0, 3).join('/')}` : '/';
  //console.log("parentPath footer: ", parentPath);
  const footerPath = parentPath=='/' ? footerMeta ? new URL(footerMeta, window.location).pathname : '/footer' : footerMeta ? new URL(footerMeta, window.location).pathname : parentPath+'/footer';
  //console.log("footerPath footer: ", footerPath);
  */

  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
}
