import {
  AfterViewInit,
  Component,
  ContentChild,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {faEllipsis} from "@fortawesome/free-solid-svg-icons";
import {columnProps, ITableConfig, Page} from "./model/table-model";
import {ModalService} from "../services/modal.service";
import {FormControl, UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  @ContentChild('headerActions') headerActions!: TemplateRef<any>;
  @ContentChild('rowActions') rowActions!: TemplateRef<any>;
  @ContentChild('customRows') customRows!: TemplateRef<any>;


  dialogRef: MatDialogRef<any>;
  @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

  @ViewChild('myTable') table: any;
  rows: any[]

  additionalSettings: ITableConfig = {
    actionable: true,
    checkable: true,
    downloadable: false,
    singleAction: false,
    showSummary: true,
    tableName: ''
  }
  page = new Page();

  @Input({required: true}) columns: columnProps[]

  @Input() pageSize: number;
  totalRecords: number;
  @Input() tableSettings: ITableConfig


  allSelected: any[] = []
  @Input({required: true})
  tableService: any



  // getListData():any {

  // }
  // @Input() callableFunction:any = TEST

  @Output()
  onSelectAll = new EventEmitter<any[]>();

  updatedColumn: any[]

  showModal: boolean = false;
  showMe: boolean = true;
  form: UntypedFormGroup;
  protected readonly faEllipsis = faEllipsis;


  //injected services
  formBuilder = inject(UntypedFormBuilder)
  modalService = inject(ModalService)
  private dialog = inject(MatDialog)
  filterActive: Boolean = false;
  loading: boolean;

  constructor() {
    this.page.pageNumber = 1;
    this.page.limit = 10;


  }

  scrollTimeout: any;
suppressPaging: boolean = false;

  handleScroll() {
    this.suppressPaging = true;
 
    if (this.scrollTimeout) {
         clearTimeout(this.scrollTimeout);
    }
 
   this.scrollTimeout = setTimeout(() => {
      this.suppressPaging = false;
   }, 100)
 }

  ngOnInit(): void {


    this.additionalSettings = {...this.additionalSettings, ...this.tableSettings,}
    this.createFilterForm()
    this.loadTableData()
    this.updatedColumn = this.updateColumnsWithActions()
  }


  getDropdownOptions(col:any) {
   return col.searchOptions
  }

  updateColumnsWithActions() {
    this.additionalSettings.actionable ? this.columns.push({name: "Actions", prop: ""}) : this.columns
    return this.columns
  }

  createFilterForm() {
    this.form = this.formBuilder.group({});
    //filter column without search
    this.columns.filter((col) => col.searchType !== undefined).forEach((control) => {
      this.form.addControl(control.prop, new FormControl(''));
    });
  }

  handleSelections() {
    this.onSelectAll.emit(this.allSelected);
  }


  getInputControl(controlName: string): FormControl {
    return this.form.get(controlName) as FormControl

  }

  ngAfterViewInit() {


    // this.table.bodyComponent.updatePage = function (direction: string): void {
    //   let offset = this.indexes.first / this.pageSize;
    //
    //   if (direction === 'up') {
    //     offset = Math.ceil(offset);
    //   } else if (direction === 'down') {
    //     offset = Math.floor(offset);
    //   }
    //
    //   if (direction !== undefined && !isNaN(offset)) {
    //     this.page.emit({offset});
    //   }
    // }
  }

  setPage(pageInfo: any) {
    if (!this.suppressPaging) {
    this.loading = true
    this.page.pageNumber = pageInfo.offset;
    this.page.limit = pageInfo.limit

    this.page.search = pageInfo.search



      //do paging
 
    this.tableService.getListData(this.page).subscribe((data: any) => {

      this.loading = false
      this.page.totalElements = data.totalRecords
      this.rows = data.data
    })

    //when page changes I want to unselect all selected rows
    this.emitSelected([])
    const headerCheckbox: HTMLElement | any | null = document.getElementById("header-check")
    if (headerCheckbox?.checked) headerCheckbox?.click()

  }
  }

  //
  // hidePaginator(rows: any[], pageSize: number, rowCount: number, currPage: number) {
  //   let status = false
  //   let lastPage: number = this.getLastPageNumber(rowCount, pageSize)
  //   if (!(rowCount / pageSize >= 1)) {
  //     status = true
  //   }
  //
  //   if (rows?.length < pageSize) {
  //     status = currPage !== lastPage;
  //   }
  //
  //   return status
  // }
  //
  // getLastPageNumber(rowCount: number, pageSize: number) {
  //
  //   //Get the last page!
  //
  //   //40 ===> 10 === 4
  //   //41 ===> 10 ==
  //
  //   let lastPage: number = Math.floor(rowCount / pageSize)
  //   let pageNumber = rowCount % pageSize
  //
  //   if (pageNumber) {
  //     lastPage = lastPage + 1
  //   }
  //   return lastPage
  // }

  toggleRowSelection({target}: any) {
    const selectAllRows = document.querySelectorAll('.my-rows')
    if (target.checked) {
      this.allSelected = []
      selectAllRows.forEach((el: any) => el.checked = true);
      this.allSelected.push(...this.rows)
      this.emitSelected(this.allSelected)
    } else {
      selectAllRows.forEach((el: any) => el.checked = false)
      this.allSelected = []
      this.emitSelected([])
    }
  }

  handleSelection(row: any, {target}: any) {
    if (target.checked) {
      this.allSelected.push(row)
      this.emitSelected(this.allSelected)
    } else {
      this.allSelected = this.allSelected.filter((val) => val.id !== row.id)
      this.emitSelected(this.allSelected)
    }
    this.handleHeaderUnselect()
  }

  handleHeaderUnselect() {
    const headerCheckbox: HTMLElement | any = document.getElementById("header-check")
    //This method checks for all selections to update toogle all checkbox when no selection is made
    const selectAllRows = document.querySelectorAll('.my-rows')
    const checkSelection = Array.from(selectAllRows).every((val: any) => val.checked === false)
    const checkSelectionSome = Array.from(selectAllRows).some((val: any) => val.checked === true)

    if (checkSelection) headerCheckbox.checked = false;
    if (checkSelectionSome) headerCheckbox.checked = true

  }

  emitSelected(rowVal: any) {

    this.onSelectAll.emit(rowVal);
  }

  handleModal($event: any) {
    console.log("I Bubbled", $event);
    this.showModal = $event;
  }


  testModal(course: any) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = course;
    dialogConfig.width = '100%';

    const dialogRef = this.dialog.open(this.dialogTemplate, dialogConfig);


    // dialogRef.afterClosed()
    //   .pipe(
    //     filter(val => !!val),
    //     tap(() => this.courseEdited.emit())
    //   )
    //   .subscribe();

  }

  toggleModal(e: any) {
    this.showModal = !this.showModal;
    this.showMe = true;
  }


  closeModal() {
    this.showModal = !this.showModal;
    this.showMe = false;
  }

  handleFilter(value: any) {

    const data = this.removeEmptyKeys({...this.additionalSettings.searchParams,...value})

    //check if the filter object has values to set the active filter flag
    this.filterActive = Object.values(data).length > 0

    this.setPage({offset: 0, limit: Infinity, search: {...data}})
    this.closeModal()
  }

  handleResetFilter() {
    this.setPage({offset: 0, limit: 10})
    this.form.reset()

    //unset filterActive flag when user resets search form
    this.filterActive = false
    this.closeModal()

  }


  loadTableData() {
    this.setPage({offset: 0, limit: 10, search: this.additionalSettings.searchParams})
    this.filterActive = false
  }


  removeEmptyKeys(obj: {}) {
    const result: Record<string, any> = {};
    Object.entries(obj).forEach(([key, value]) => {
      if (value) {
        result[key] = value;
      }
    });

    return result;
  }

  protected readonly length = length;

}
