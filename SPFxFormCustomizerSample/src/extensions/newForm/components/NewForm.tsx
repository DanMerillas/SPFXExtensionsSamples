import * as React from 'react';
import { Log, FormDisplayMode } from '@microsoft/sp-core-library';
import { FormCustomizerContext } from '@microsoft/sp-listview-extensibility';
import { PacmanLoader } from 'react-spinners';

//import styles from './NewForm.module.scss';

export interface INewFormProps {
  context: FormCustomizerContext;
  displayMode: FormDisplayMode;
  onSave: () => void;
  onClose: () => void;
}

const LOG_SOURCE: string = 'NewForm';

export default class NewForm extends React.Component<INewFormProps, {}> {
  public componentDidMount(): void {
    Log.info(LOG_SOURCE, 'React Element: NewForm mounted');
  }

  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: NewForm unmounted');
  }

  public render(): React.ReactElement<{}> {
    //console.log(this.props.context.list.title)

    const modo = this.props.displayMode === 8 ? 'Nuevo' : this.props.displayMode === 4 ? 'Ver' : 'Editar'

    

    return <div style={{ margin: '50px' }}>
      <h1>Lista:{this.props.context.list.title}</h1>
      <h2>Modo:{modo}</h2>
      <p><PacmanLoader color="#36d7b7" /></p>
      <p>Este es el formulario personalizado </p>
      {this.props.context?.item && <p>{`Id: ${this.props.context.item.ID}   ->   Titulo: ${this.props.context.item.Title}`}</p>}
    </div>;
  }
}
