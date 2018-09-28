/***********************************************************************************************
	PopupEvent Class
		@class PopupEvent
		@version 1a.0
		@date 9/17/2008
		@author Matthew Monahan
***********************************************************************************************/
package{
	import flash.events.Event;

	public class PopupEvent extends Event {
		public static const MESSAGE:String = "popControl";
		private var _command:String;

		/*
			@function PopupEvent Constructor for PopupEvent
			@param _command:String command to forward with dispatch
		*/
		public function PopupEvent( _command:String ) {
			super(MESSAGE);
			this._command = _command;
		}
		
		/*
			@function get command
			@return String returns the command dispatched
		*/	
		public function get command():String { return _command; }
		
		/*
			@function clone
			@return a copy
		*/	
		public override function clone():Event {
			return new PopupEvent(MESSAGE);
		}
	}
}