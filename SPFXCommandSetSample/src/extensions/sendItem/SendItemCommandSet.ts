/* eslint-disable @typescript-eslint/no-floating-promises */
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetExecuteEventParameters,
  ListViewStateChangedEventArgs
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ISendItemCommandSetProperties {
  // This is an example; replace with your own properties
  sampleTextOne: string;
  sampleTextTwo: string;
}

const LOG_SOURCE: string = 'SendItemCommandSet';

export default class SendItemCommandSet extends BaseListViewCommandSet<ISendItemCommandSetProperties> {

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized SendItemCommandSet');

    // initial state of the command's visibility
    const compareOneCommand: Command = this.tryGetCommand('COMMAND_1');
    compareOneCommand.visible = false;

    const compareTwoCommand: Command = this.tryGetCommand('COMMAND_2');
    compareTwoCommand.visible = false;

    this.context.listView.listViewStateChangedEvent.add(this, this._onListViewStateChanged);

    return Promise.resolve();
  }

  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
      case 'COMMAND_1':
        Dialog.alert(`Has enviado: ${this.context.listView.selectedRows[0].getValueByName('ID')} -> ${this.context.listView.selectedRows[0].getValueByName('Title')} a la luna 🌛👩‍🚀👨‍🚀`).catch(() => {
          /* handle error */
        });
        break;
      case 'COMMAND_2':
        Dialog.prompt('Introduce "fuego e ira" para destruir a esos fucking elementos').then((value) => {

          if (value === "fuego e ira")
            Dialog.alert(`Has destruido: ${this.context.listView.selectedRows.map(x => x.getValueByName('ID') + "->" + x.getValueByName('Title') + " ")}💣💣🔥🔥`)
          else
            Dialog.alert(`Este área es para valientes me da igual has destruido igualmente: ${this.context.listView.selectedRows.map(x => x.getValueByName('ID') + "->" + x.getValueByName('Title') + " ")}💣💣🔥🔥`)
        })
        break;
      default:
        throw new Error('Unknown command');
    }
  }

  private _onListViewStateChanged = (args: ListViewStateChangedEventArgs): void => {
    Log.info(LOG_SOURCE, 'List view state changed');

    const compareOneCommand: Command = this.tryGetCommand('COMMAND_1');
    if (compareOneCommand) {
      // This command should be hidden unless exactly one row is selected.
      compareOneCommand.visible = this.context.listView.selectedRows?.length === 1;
    }

    const compareTwoCommand: Command = this.tryGetCommand('COMMAND_2');
    if (compareTwoCommand) {
      // This command should be hidden unless exactly one row is selected.
      compareTwoCommand.visible = this.context.listView.selectedRows?.length > 0;
    }

    // TODO: Add your logic here

    // You should call this.raiseOnChage() to update the command bar
    this.raiseOnChange();
  }
}
