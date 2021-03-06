
<!-- top tiles -->
<div class="row tile_count">
  <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
    <span class="count_top"><i class="fa fa-dollar"></i> Pago</span>
    <div class="count" class='btn-product-detail'>2500</div>
    <span class="count_bottom"><i class="green">4% </i> From last Week</span>
  </div>
  <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
    <span class="count_top"><i class="fa fa-dollar"></i> Faturado</span>
    <div class="count">123.50</div>
    <span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>3% </i> From last Week</span>
  </div>
  <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
    <span class="count_top"><i class="fa fa-send"></i> Enviado</span>
    <div class="count green">2,500</div>
    <span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>34% </i> From last Week</span>
  </div>
  <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
    <span class="count_top"><i class="fa fa-check-square-o"></i> Concluído</span>
    <div class="count">4,567</div>
    <span class="count_bottom"><i class="red"><i class="fa fa-sort-desc"></i>12% </i> From last Week</span>
  </div>
    <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
    <span class="count_top"><i class="fa fa-thumbs-o-down"></i> Cancelado</span>
    <div class="count">7,325</div>
    <span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>34% </i> From last Week</span>
  </div>
  <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
    <span class="count_top"><i class="fa fa-history"></i> Histórico</span>
    <div class="count">2,315</div>
    <span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>34% </i> From last Week</span>
  </div>

</div>
<!-- /top tiles -->


           
<div class="row x_title">
    <div class="col-md-6">
        <h3>Produtos <small>Graph title sub-title</small><br>
            
            <span class="hidden this-user-id">
                <?php 
                    echo Yii::$app->user->identity->id;                        
                ?>
            </span>
        </h3>
    </div>
    <div class="col-md-6">
        <div id="" class="pull-right">            
            <div class="btn-group pagination-list">
 <!--               <button type="button" class="btn btn-default btn-product-list-next">Anterior</button>                
                <button class="btn btn-default" type="button">1</button>
                <button class="btn btn-default active" type="button">2</button>
                <button class="btn btn-default" type="button">3</button>
                <button class="btn btn-default" type="button">4</button>
                <button type="button" class="btn btn-default btn-product-list-previous">Próximo</button>-->
            </div>
            <div class="btn-group">
                <button type="button" class="btn btn-primary btn-product-new" data-toggle="modal" data-target=".product-modal-lg"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span>  Novo</button>
            </div>
        </div>
    </div>
</div>
<div class="row">
      <div class="table-responsive">
        <table class="table table-striped jambo_table bulk_action">
          <thead>
            <tr class="headings">
              <th>
                <input type="checkbox" id="check-all" class="flat">
              </th>
              <th class="column-title">Foto </th>
              <th class="column-title no-link"> <span class="nobr">Nome do Produto </span></th>
              <th class="column-title">SKU Interno </th>
              <th class="column-title">Custo </th>
              <th class="column-title">Status </th>
              <th class="column-title last">Estoque </th>              
              <th class="bulk-actions" colspan="7">
                <a class="antoo" style="color:#fff; font-weight:500;">Bulk Actions ( <span class="action-cnt"> </span> ) <i class="fa fa-chevron-down"></i></a>
              </th>
            </tr>
          </thead>

          <tbody class='product-list'>
            <!--            
            <tr class="even pointer">
              <td class="a-center ">
                <input type="checkbox" class="flat" name="table_records">
              </td>
              <td class=" "><img src='http://s3-sa-east-1.amazonaws.com/images.anymarket.com.br/118564309./1481195249571/thumbnail.jpg' /></td>
              <td class=" ">May 23, 2014 11:47:56 PM </td>
              <td class=" ">121000210 <i class="success fa fa-long-arrow-up"></i></td>
              <td class=" ">John Blank L</td>
              <td class=" ">Paid</td>
              <td class=" ">Paid</td>
            </tr>
            <tr class="odd pointer">
              <td class="a-center ">
                <input type="checkbox" class="flat" name="table_records">
              </td>
              <td class=" ">121000039</td>
              <td class=" ">May 23, 2014 11:30:12 PM</td>
              <td class=" ">121000208 <i class="success fa fa-long-arrow-up"></i>
              </td>
              <td class=" ">John Blank L</td>
              <td class=" ">Paid</td>
              <td class=" ">Paid</td>
            </tr>  -->
          </tbody>
        </table>
      </div>
</div>



<div class="modal fade product-modal-lg" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span>
              </button>
              <h4 class="modal-title" id="myModalLabel">Detalhes do Produto</h4>
            </div>
            <div class="modal-body">
                
                    <form id="form-product-detail" data-parsley-validate="" class="form-vertical form-label-left" novalidate="">

                        <div class="col-md-6">
                        
                        <div class="form-group col-md-12">
                          <label class="" for="first-name">Nome do Produto <span class="required">*</span>                         </label>
                          <div class="">
                              <input type="text" name="name" id="name" class="form-control col-md-7 col-xs-12" data-parsley-id="5">
                        </div>
                        </div>
                        <div class="form-group col-md-4">
                            <label class="control-label" for="sku">SKU Interno <span class="required"> </span></label>
                            <div class="">
                                <input type="text" name="sku" id="sku" class="form-control col-md-7 col-xs-12" data-parsley-id="5">
                            </div>
                        </div>
                        <div class="form-group col-md-8">
                          <label class="" for="category">Categoria <span class="required">*</span>
                            </label>
                            <div class="">
                                <!--<input type="text" id="category" name="category" class="form-control col-md-7 col-xs-12" data-parsley-id="5">-->
                                <select class="form-control" id="category" name="category">
                                    
                                </select>
                            </div>
                        </div>
                        <div class="form-group col-md-4">
                          <label for="stock" class="control-label">Estoque <span class="required">*</span></label>
                          <div class="">
                              <input placeholder="Quantidade" id="stock" class="form-control col-md-7 col-xs-12" type="number" name="stock" data-parsley-id="9" min="0">
                          </div>
                        </div>
                        
                        <div class="form-group col-md-4">
                          <label class="" for="cost">Custo<span class="required">*</span>
                          </label>
                          <div class="">
                              <input placeholder="R$" type="number" id="cost" min="0" name="cost" class="form-control col-md-7 col-xs-12" data-parsley-id="5">
                          </div>
                        </div>                        
                        <div class="form-group col-md-4">
                          <label class="" for="price-final">Preço<span class="required">*</span>
                          </label>
                          <div class="">
                            <input placeholder="R$" type="number" id="price-final" min="0" name="price-final" class="form-control col-md-7 col-xs-12" data-parsley-id="7">
                          </div>
                        </div>
                        
                            
<!--                        <div class="form-group col-md-9">
                            <label class="" for="bar-code">Codigo de Barra</label>
                            <div class="">
                                <input type="text" name="bar-code" id="bar-code" class="form-control col-md-7 col-xs-12" data-parsley-id="5">
                            </div>
                        </div>-->
                        
                        
                        
                                
                <div class="x_content">
                    <label class="" for="editor">Descrição </label>
                  <div class="btn-toolbar editor" data-role="editor-toolbar" data-target="#editor">
                    <div class="btn-group">
                      <a class="btn dropdown-toggle" data-toggle="dropdown" title="" data-original-title="Font"><i class="fa fa-font"></i><b class="caret"></b></a>
                      <ul class="dropdown-menu">
                      <li><a data-edit="fontName Serif" style="font-family:'Serif'">Serif</a></li><li><a data-edit="fontName Sans" style="font-family:'Sans'">Sans</a></li><li><a data-edit="fontName Arial" style="font-family:'Arial'">Arial</a></li><li><a data-edit="fontName Arial Black" style="font-family:'Arial Black'">Arial Black</a></li><li><a data-edit="fontName Courier" style="font-family:'Courier'">Courier</a></li><li><a data-edit="fontName Courier New" style="font-family:'Courier New'">Courier New</a></li><li><a data-edit="fontName Comic Sans MS" style="font-family:'Comic Sans MS'">Comic Sans MS</a></li><li><a data-edit="fontName Helvetica" style="font-family:'Helvetica'">Helvetica</a></li><li><a data-edit="fontName Impact" style="font-family:'Impact'">Impact</a></li><li><a data-edit="fontName Lucida Grande" style="font-family:'Lucida Grande'">Lucida Grande</a></li><li><a data-edit="fontName Lucida Sans" style="font-family:'Lucida Sans'">Lucida Sans</a></li><li><a data-edit="fontName Tahoma" style="font-family:'Tahoma'">Tahoma</a></li><li><a data-edit="fontName Times" style="font-family:'Times'">Times</a></li><li><a data-edit="fontName Times New Roman" style="font-family:'Times New Roman'">Times New Roman</a></li><li><a data-edit="fontName Verdana" style="font-family:'Verdana'">Verdana</a></li></ul>
                    </div>

                    <div class="btn-group">
                      <a class="btn dropdown-toggle" data-toggle="dropdown" title="" data-original-title="Font Size"><i class="fa fa-text-height"></i>&nbsp;<b class="caret"></b></a>
                      <ul class="dropdown-menu">
                        <li>
                          <a data-edit="fontSize 5">
                            <p style="font-size:17px">Grande</p>
                          </a>
                        </li>
                        <li>
                          <a data-edit="fontSize 3">
                            <p style="font-size:14px">Normal</p>
                          </a>
                        </li>
                        <li>
                          <a data-edit="fontSize 1">
                            <p style="font-size:11px">Pequeno</p>
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div class="btn-group">
                      <a class="btn" data-edit="bold" title="" data-original-title="Bold (Ctrl/Cmd+B)"><i class="fa fa-bold"></i></a>
                      <a class="btn" data-edit="italic" title="" data-original-title="Italic (Ctrl/Cmd+I)"><i class="fa fa-italic"></i></a>
                      <a class="btn" data-edit="strikethrough" title="" data-original-title="Strikethrough"><i class="fa fa-strikethrough"></i></a>
                      <a class="btn" data-edit="underline" title="" data-original-title="Underline (Ctrl/Cmd+U)"><i class="fa fa-underline"></i></a>
                    </div>

                    <div class="btn-group">
                      <a class="btn" data-edit="insertunorderedlist" title="" data-original-title="Bullet list"><i class="fa fa-list-ul"></i></a>
                      <a class="btn" data-edit="insertorderedlist" title="" data-original-title="Number list"><i class="fa fa-list-ol"></i></a>
<!--                      <a class="btn" data-edit="outdent" title="" data-original-title="Reduce indent (Shift+Tab)"><i class="fa fa-dedent"></i></a>
                      <a class="btn" data-edit="indent" title="" data-original-title="Indent (Tab)"><i class="fa fa-indent"></i></a>-->
                    </div>

                    <div class="btn-group">
                      <a class="btn btn-info" data-edit="justifyleft" title="" data-original-title="Align Left (Ctrl/Cmd+L)"><i class="fa fa-align-left"></i></a>
                      <a class="btn" data-edit="justifycenter" title="" data-original-title="Center (Ctrl/Cmd+E)"><i class="fa fa-align-center"></i></a>
                      <a class="btn" data-edit="justifyright" title="" data-original-title="Align Right (Ctrl/Cmd+R)"><i class="fa fa-align-right"></i></a>
                      <a class="btn" data-edit="justifyfull" title="" data-original-title="Justify (Ctrl/Cmd+J)"><i class="fa fa-align-justify"></i></a>
                    </div>

<!--                    <div class="btn-group">
                      <a class="btn dropdown-toggle" data-toggle="dropdown" title="" data-original-title="Hyperlink"><i class="fa fa-link"></i></a>
                      <div class="dropdown-menu input-append">
                        <input class="span2" placeholder="URL" type="text" data-edit="createLink">
                        <button class="btn" type="button">Adicionar</button>
                      </div>
                      <a class="btn" data-edit="unlink" title="" data-original-title="Remove Hyperlink"><i class="fa fa-cut"></i></a>
                    </div>-->

<!--                    <div class="btn-group">
                      <a class="btn" title="" id="pictureBtn" data-original-title="Insert picture (or just drag &amp; drop)"><i class="fa fa-picture-o"></i></a>
                      <input type="file" data-role="magic-overlay" data-target="#pictureBtn" data-edit="insertImage" style="opacity: 0; position: absolute; top: 0px; left: 0px; width: 37px; height: 34px;">
                    </div>-->

<!--                    <div class="btn-group">
                      <a class="btn" data-edit="undo" title="" data-original-title="Undo (Ctrl/Cmd+Z)"><i class="fa fa-undo"></i></a>
                      <a class="btn" data-edit="redo" title="" data-original-title="Redo (Ctrl/Cmd+Y)"><i class="fa fa-repeat"></i></a>
                    </div>-->
                  </div>

                  <div id="editor" class="editor-wrapper placeholderText" contenteditable="true"></div>

                  <textarea name="descr" id="descr" style="display:none;"></textarea>
                </div>
                            
                    </div>        
                    <div class="col-md-6">
                        
                        <div class="form-group col-md-6">
                            <label class="" for="origin">Origem
                            </label>
                            <div class="">
                                <input type="text" id="origin" name="origin" class="form-control col-md-7 col-xs-12" data-parsley-id="5">
                            </div>
                        </div>
                        <div class="form-group col-md-6">
                           <label for="operation-period" class="control-label">Prazo da Operação</label>
                           <div class="">
                               <input placeholder="Dias" id="operation-period" min="0" class="form-control col-md-7 col-xs-12" type="number" name="operation-period" data-parsley-id="9">
                           </div>
                        </div>
                        
                        
<!--                        <div class="form-group">
                          <label class="control-label col-md-12" for="product-measure">Medidas do Produto<span class="required">*</span>
                              
                          </label>
                            <div class="col-md-3">
                                <input placeholder="Largura" type="number" name="product-width" id="product-width" class="form-control col-md-7 col-xs-12" data-parsley-id="5">
                            </div>
                            <div class="col-md-3">
                                <input placeholder="Altura" type="number" name="product-height" id="product-height" class="form-control col-md-7 col-xs-12" data-parsley-id="5">
                            </div>
                            <div class="col-md-3">
                                <input placeholder="Comprimento" type="number" name="product-length" id="product-length" class="form-control col-md-7 col-xs-12" data-parsley-id="5">
                            </div>
                            <div class="col-md-3">
                                <input placeholder="Peso" type="number" name="product-weight" id="product-weight" class="form-control col-md-7 col-xs-12" data-parsley-id="5">
                            </div>
                        </div>          -->
                        <div class="form-group col-md-3">
                          <label class="col-md-12" for="pack-measure">Largura
                          </label>
                            <div class="">
                                <input placeholder="m" type="number" min="0" name="pack-width" id="pack-width" class="form-control col-md-7 col-xs-12" data-parsley-id="5">
                            </div>
                        </div>
                        <div class="form-group col-md-3">
                          <label class="col-md-12" for="pack-measure">Altura
                          </label>
                            <div class="">
                                <input placeholder="m" type="number" min="0" name="pack-height" id="pack-height" class="form-control col-md-7 col-xs-12" data-parsley-id="5">
                            </div>
                        </div>
                        <div class="form-group col-md-3">
                          <label class="col-md-12" for="pack-measure">Comprimento
                          </label>
                            <div class="">
                                <input placeholder="m" type="number" min="0" name="pack-length" id="pack-length" class="form-control col-md-7 col-xs-12" data-parsley-id="5">
                            </div>
                        </div>
                        <div class="form-group col-md-3">
                          <label class="col-md-12" for="pack-measure">Peso
                          </label>
                            <div class="">
                                <input placeholder="kg" type="number" min="0" name="pack-weigth" id="pack-weight" class="form-control col-md-7 col-xs-12" data-parsley-id="5">
                            </div>
                        </div>
                        
                        <div class="form-group col-md-3">
                          <label class="" for="warranty-time">Tempo de Garantia
                          </label>
                          <div class="">
                              <input placeholder="Meses" type="text" min="0" name="warranty-time" id="warranty-time" class="form-control col-md-7 col-xs-12" data-parsley-id="5">
                          </div>
                        </div>
                        <div class="form-group col-md-9">
                          <label class="" for="warranty-text">Texto de Garantia
                          </label>
                          <div class="">
                              <input type="text" name="warranty-text" id="warranty-text" class="form-control col-md-7 col-xs-12" data-parsley-id="5">
                          </div>
                        </div>
                        
                        
                        <div class="row col-md-12"> <label class="" for="origin">Fotos: </label> </div>
 <!--                      <div class="row img-thumbnail-list-product">                      
                      <div class="col-md-55">
                            <div class="thumbnail">
                              <div class="image view view-first">
                                <img style="width: 100%; display: block;" src="images/media.jpg" alt="image">
                                <div class="mask no-caption">
                                  <div class="tools tools-bottom">
                                    <a href="#"><i class="fa fa-link"></i></a>
                                    <a href="#"><i class="fa fa-pencil"></i></a>
                                    <a href="#"><i class="fa fa-times"></i></a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>-->
                    </form>
                    <div class="clearfix"></div>
                        <div class="row">
                            
                            
                            <div id="myDropzone" class="dropzone dz-clickable">
                                <div id="previews" class="dropzone-previews"></div>
                                <div class="dz-default dz-message"><span>Clique ou arraste as imagens aqui</span></div>
                            </div>
     
                            <?php

//                                echo \kato\DropZone::widget([
//                                       'options' => [
//                                           'maxFilesize' => '2',
//                                           'acceptedFiles' => 'image/*',
//                                           'url' => '/product/upload',
//                                           'addRemoveLinks' => true,
//                                           'maxFiles' => 6,
//                                           'dictDefaultMessage' => 'Clique ou arraste as imagens aqui',
//                                           'dictMaxFilesExceeded' => 'Você atingiu o limite de imagens para upload',
//                                           'dictRemoveFile' => 'Remover imagem',
//                                           'dictCancelUpload' => 'Calcelar upload',
//                                           'dictFileTooBig' => 'Imagem muito grande para este upload',
//                                           'hiddenInputContainer' => '#thisUploadProductID',  
//                                       ],
//                                       'clientEvents' => [
//                                           'complete' => "function(file){console.log(file)}",
//                                           'removedfile' => "function(file){alert(file.name + ' is removed')}"
//                                       ],
//                                   ]);

                            ?>
                        </div>
                    </div> 
                    
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-link btn-delete-product" >Deletar</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-primary btn-save-product">Salvar produto</button>
            </div>
        </div>
    </div>
</div>








 

 



