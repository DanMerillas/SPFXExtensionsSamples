import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';


const LOG_SOURCE: string = 'FooterExtensionApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IFooterExtensionApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class FooterExtensionApplicationCustomizer
  extends BaseApplicationCustomizer<IFooterExtensionApplicationCustomizerProperties> {

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${this.context.pageContext.web.title}`);

    // TODO:Llevar los estilos a una hoja de estilos
    const footerHtml: string = `
      <div class="footer" style="background-color:#1B3B48;color:white;min-height:26px;font-weight: bold;">
        <p style="margin:0px;padding:10px;">© Área de SharePoint MINSAIT</p>
      </div>
    `;

    // Inserta el pie de página en un contenedor específico utilizando un Placeholder
    const footerPlaceholder: PlaceholderContent = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Bottom);
    if (footerPlaceholder) {
      footerPlaceholder.domElement.innerHTML = footerHtml;
    }

    return Promise.resolve();
  }
}
